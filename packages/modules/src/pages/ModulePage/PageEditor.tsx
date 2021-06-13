import React, { FC, useEffect, useState, useContext, createRef } from "react"
import { USER, LocalLogin } from "@makeamodule/shared-frontend"
import { useTheme } from "@material-ui/core"
import { useQuery, ApolloError } from "@apollo/client"
import { GET_MODULE } from "../../grqphql/queries"
import { useParams } from "react-router-dom"
import { Container, Draggable } from "react-smooth-dnd"
import { ModuleContext } from "../../Context"
import {
  Grid,
  CardContent,
  Typography,
  Link,
  Icon,
  Card,
  Button,
  TextField,
  IconButton
} from "@material-ui/core"
import CodeIcon from "@material-ui/icons/Code"
import AddBoxIcon from "@material-ui/icons/AddBox"
import ImageIcon from "@material-ui/icons/Image"
import EditableTitle from "./components/EditableTitle"
import DeletePageConfirmModal from "./components/DeletePageConfirmModal"
import AddTemplateModal from "./components/AddTemplateModal"
import CloseIcon from "@material-ui/icons/Close"
import { Module } from "../../../generated/graphql-frontend"

function makeid(length: number) {
  var result = []
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join("")
}

let pageTemplates = [
  {
    id: "asdf",
    name: "Blank Page",
    type: "regular",
    thumbnail: ""
  },
  {
    id: "jkl;",
    name: "Custom Page",
    type: "custom",
    thumbnail: ""
  }
]

let lessons_from_server = [
  {
    id: "ashdjkserbja",
    title: "Activity 1",
    page_ids: ["sdfhunasmds", "sdfnfdsjre"]
  },
  {
    id: "gerwsrtveer",
    title: "Activity 2",
    page_ids: ["ernejfke"]
  },
  {
    id: "edfs",
    title: "Activity 3",
    page_ids: ["sdfgssfd", "nddfsdf"]
  }
]

let pages_from_server = [
  {
    id: "sdfhunasmds",
    name: "Page A",
    type: "regular",
    page_component_id: "dtrhdt",
    flowchart_id: "ewrnfhdsj"
  },
  {
    id: "sdfnfdsjre",
    name: "Page B",
    type: "regular",
    page_component_id: "dpdsfogj",
    flowchart_id: "poenw"
  },
  {
    id: "ernejfke",
    name: "Page C",
    type: "custom",
    page_component_id: "dpdsfogj",
    flowchart_id: null
  },
  {
    id: "sdfgssfd",
    name: "Page D",
    type: "custom",
    page_component_id: "",
    flowchart_id: null
  },
  {
    id: "nddfsdf",
    name: "Page E",
    type: "custom",
    page_component_id: "",
    flowchart_id: null
  }
]

let unused_pages_from_server = [
  {
    id: "wegr",
    name: "Unused Page 1",
    type: "custom",
    page_component_id: "",
    flowchart_id: "asdf"
  },
  {
    id: "xcvb",
    name: "Unused Page 2",
    type: "custom",
    page_component_id: "",
    flowchart_id: null
  }
]

interface IProps {
  module: Module
}

const PageEditor: FC<IProps> = ({ module }) => {
  // const [addModalOpen, setAddModalOpen] = useState(false)
  // const [serverError, setServerError] = useState<ApolloError>(null)
  // const { palette } = useTheme()
  // const [tabValue, setTabValue] = useState(0)
  const [activities, setActivities] = useState([])
  const [pages, setPages] = useState([])
  const [unusedPages, setUnusedPages] = useState([])
  // let { id } = useParams<{ id: string }>()
  const [deletePageModalOpen, setDeletePageModalOpen] = useState(false)
  const [deletePageInfo, setDeletePageInfo] = useState<any>({})
  const [addPageTemplateModalOpen, setAddPageTemplateModalOpen] =
    useState(false)
  // const unusedDroppableContainer = createRef<Container>()
  // const {
  //   loading,
  //   error,
  //   data: { getModule: module } = []
  // } = useQuery(GET_MODULE, {
  //   variables: { id }
  // })

  // in real life, this will be loaded by the server
  // for now, just use 'dummy data'
  useEffect(() => {
    setActivities(lessons_from_server)
    setPages(pages_from_server)
    setUnusedPages(unused_pages_from_server)
  }, [])

  async function onActivityDrop(dropResult: any) {
    const { removedIndex, addedIndex, payload, element } = dropResult

    let removedActivity = activities[removedIndex]

    let newActivites = [...activities]

    newActivites.splice(removedIndex, 1)
    newActivites.splice(addedIndex, 0, removedActivity)

    setActivities(newActivites)
  }

  // gets called for all sections on all drops
  async function onPageDrop(
    dropResult: any,
    droppedSection: string, // 'section' or 'unusedPages'
    activityIndex: number | null
  ) {
    const { removedIndex, addedIndex, payload, element } = dropResult

    let newActivites = [...activities]

    let { from, ...payloadPage } = payload

    if (droppedSection === "section") {
      if (removedIndex !== null && activityIndex !== null) {
        // could be zero!
        // this is the case something removed from Activites and dropped in Unused
        newActivites[activityIndex].page_ids.splice(removedIndex, 1)
      }

      if (addedIndex !== null && activityIndex !== null) {
        // this is the case where a page has either been added from templates or unuesed ..
        // - OR -  it has been moved withing the 'activities', either from one activity to another or rearranged within the activity
        //if (payloadPage.new) {
        if (from === "templates") {
          let newPages = [...pages]
          let newId = makeid(15)
          payloadPage.id = newId
          newPages.splice(addedIndex, 0, payloadPage)
          console.log("SETTING NEW PAGES")
          console.log(newPages)
          setPages(newPages)
          newActivites[activityIndex].page_ids.splice(
            addedIndex,
            0,
            payloadPage.id
          )
        } else {
          newActivites[activityIndex].page_ids.splice(
            addedIndex,
            0,
            payloadPage.id
          )
        }
      }

      // now we need to figure out where the page is 'from'
      // my data is a little weird, hence the need for this. Remove from unused pages and add to pages
      console.log(pages)
      if (from === "unusedPages") {
        // let newUnusedPages = [...unusedPages]
        let newPages = [...pages]
        // let formerlyUnusedPage = newUnusedPages.find(
        //   (unusedPage) => unusedPage.id === payloadPage.id
        // )
        // let index = unusedPages.findIndex(
        //   (unusedPage) => unusedPage.id === payloadPage.id
        // )
        //newUnusedPages.splice(index, 1)
        newPages.splice(addedIndex, 0, payloadPage)
        //setUnusedPages(newUnusedPages)
        // now set the new pages array
        setPages(newPages)
      } else if (from === "templates") {
        // make a new id just rnadom for now.
        // let newPages = [...pages]
        // let newId = makeid(15)
        // payloadPage.id = newId
        // newPages.splice(addedIndex, 0, payloadPage)
        // // now set the new pages array
        // console.log("SETTING NEW PAGES")
        // console.log(newPages)
        // setPages(newPages)
      }

      // and finally, set the activities
      setActivities(newActivites)
    } else if (droppedSection === "unusedPages") {
      let newUnusedPages = [...unusedPages]

      if (removedIndex !== null) {
        newUnusedPages.splice(removedIndex, 1)
      }
      if (addedIndex !== null) {
        newUnusedPages.splice(addedIndex, 0, payloadPage)
      }

      setUnusedPages(newUnusedPages)

      // setCourseData(newCourseJson)
    }
  }

  return (
    <>
      <DeletePageConfirmModal
        modalOpen={deletePageModalOpen}
        setModalOpen={setDeletePageModalOpen}
        pageName={deletePageInfo.name}
        deleteFcn={() => {
          let { id } = deletePageInfo
          let newUnusedPages = [...unusedPages]
          let index = newUnusedPages.findIndex((page) => page.id === id)
          newUnusedPages.splice(index, 1)
          setUnusedPages(newUnusedPages)
        }}
      />
      <AddTemplateModal
        modalOpen={addPageTemplateModalOpen}
        setModalOpen={setAddPageTemplateModalOpen}
        addFcn={() => {
          console.log("Add tempalte modal")
        }}
      />
      <Grid container spacing={3} id="page-editor">
        {/* The header */}
        <Grid item container xs={12}>
          <Grid container item xs={2} direction="column">
            <Grid item>
              <Typography
                variant="h6"
                component="h6"
                style={{ padding: "4px" }}
              >
                Templates
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  setAddPageTemplateModalOpen(true)
                }}
              >
                Add Template
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={8} direction="column">
            <Grid item>
              <Typography
                variant="h6"
                component="h6"
                style={{ padding: "4px" }}
              >
                Activities
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  let newActivites = [...activities]
                  let newActivityTitle: string // = "New Activity"
                  let nomatches: boolean
                  let counter = 0
                  while (nomatches !== true) {
                    counter === 0
                      ? (newActivityTitle = "New Activity")
                      : (newActivityTitle = `New Activity ${counter}`)

                    let index = newActivites.findIndex(
                      (activity) => activity.title === newActivityTitle
                    )

                    if (index === -1) {
                      nomatches = true
                    } else {
                      nomatches = false
                      counter++
                    }
                  }
                  let newId = makeid(10)
                  newActivites.unshift({
                    id: newId,
                    title: newActivityTitle,
                    page_ids: []
                  })

                  setActivities(newActivites)

                  // {
                  //   id: "ashdjkserbja",
                  //   title: "Activity 1",
                  //   page_ids: ["sdfhunasmds", "sdfnfdsjre"]
                  // }
                }}
              >
                Add Activity
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" component="h6">
              Unused
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid container item xs={2} direction="column"></Grid>
        </Grid>
        {/* Now the Drag and drops... */}
        <Grid item container xs={12}>
          {/* Templates ... */}
          <Grid container item xs={2}>
            <Container
              groupName="pageContainer"
              dropPlaceholder={{ className: "pageShadow" }}
              dragClass="pageDrag"
              dropClass="pageDrop"
              behaviour="copy"
              getChildPayload={(index) => {
                return {
                  ...pageTemplates[index],
                  from: "templates"
                } // Make sure this is a COPY to prevent editing lol
              }}
            >
              {pageTemplates.map((template) => {
                return (
                  <Draggable key={template.id}>
                    <Card
                      variant="outlined"
                      className="pageCard pageCardGreyBg"
                    >
                      <CardContent className="pageCardContent">
                        <div className="cardThumbnail">
                          {template.thumbnail ? (
                            <p>Thumbnail should go here</p>
                          ) : template.type === "regular" ? (
                            <AddBoxIcon />
                          ) : template.type === "custom" ? (
                            <CodeIcon />
                          ) : (
                            <ImageIcon />
                          )}
                        </div>
                        <Typography variant="body1">{template.name}</Typography>
                      </CardContent>
                    </Card>
                  </Draggable>
                )
              })}
            </Container>
          </Grid>
          {/* Activities ... */}
          <Grid container item xs={8}>
            <Container
              onDrop={onActivityDrop}
              dragClass="pageDrag"
              dropClass="pageDrop"
              dropPlaceholder={{ className: "pageShadow" }}
              nonDragAreaSelector=".activityTitle"
            >
              {activities.map((activity, activityIndex) => {
                // oops, I've accidently been calling "activities" "lessons" .. might want to change in the code later
                // for now just call them 'activity' going forward ..
                return (
                  <Draggable key={activity.id}>
                    <div className="sectionWrapper">
                      <EditableTitle
                        editableTitle={activity.title}
                        setEditableTitle={(newTitle: string) => {
                          let newActivities = [...activities]
                          newActivities[activityIndex].title = newTitle
                          setActivities(newActivities)
                        }}
                        variant="body1"
                        inputClassName="activityTitle"
                      />
                      {activity.page_ids.length === 0 && (
                        <CloseIcon
                          className="deleteActivityIcon"
                          onClick={() => {
                            let newActivities = [...activities]
                            newActivities.splice(activityIndex, 1)
                            setActivities(newActivities)
                          }}
                        />
                      )}
                      <div
                        className={`containerClass sectionContainer ${
                          activity.page_ids.length === 0 ? "empty" : ""
                        }`}
                      >
                        <Container
                          groupName="pageContainer"
                          orientation="horizontal"
                          dropPlaceholder={{ className: "pageShadow" }}
                          dragClass="pageDrag"
                          dropClass="pageDrop"
                          onDrop={(dropResult) =>
                            onPageDrop(dropResult, "section", activityIndex)
                          }
                          getChildPayload={(index) => {
                            let page_id = activity.page_ids[index]
                            let page = pages.find((page) => page.id === page_id)
                            return { ...page, from: "section" }
                          }}
                          nonDragAreaSelector=".pageTitle"
                        >
                          {activity.page_ids.map((page_id: string) => {
                            return (
                              <Draggable key={page_id}>
                                <Card
                                  variant="outlined"
                                  className="pageCard pageCardGreyBg"
                                >
                                  <CardContent className="pageCardContent">
                                    <div className="cardThumbnail">
                                      <ImageIcon />
                                    </div>
                                    <EditableTitle
                                      editableTitle={
                                        pages.find(
                                          (page) => page.id === page_id
                                        ).name
                                      }
                                      setEditableTitle={(newTitle: string) => {
                                        let newPages = [...pages]
                                        let pageIndex = pages.findIndex(
                                          (page) => page.id === page_id
                                        )
                                        console.log("PAGE IS")
                                        console.log(newPages)
                                        console.log(pageIndex)
                                        newPages[pageIndex].name = newTitle
                                        setPages(newPages)
                                      }}
                                      variant="body1"
                                      inputClassName="pageTitle"
                                    />
                                  </CardContent>
                                </Card>
                              </Draggable>
                            )
                          })}
                        </Container>
                      </div>
                    </div>
                  </Draggable>
                )
              })}
            </Container>
          </Grid>
          {/* Unused ... */}
          <Grid container item xs={2}>
            <div id="UnusedPagesContainer" className="unusedContainerClass">
              <Container
                groupName="pageContainer"
                getChildPayload={(index) => {
                  return { ...unusedPages[index], from: "unusedPages" }
                }}
                dropPlaceholder={{ className: "pageShadow" }}
                dragClass="pageDrag"
                dropClass="pageDrop"
                onDrop={(dropResult) =>
                  onPageDrop(dropResult, "unusedPages", null)
                }
              >
                {unusedPages.map((page) => {
                  return (
                    <Draggable key={page.id}>
                      <Card
                        variant="outlined"
                        className="pageCard pageCardGreyBg"
                      >
                        <CardContent className="pageCardContent">
                          <CloseIcon
                            className="deletePageIcon"
                            onClick={() => {
                              setDeletePageInfo({
                                id: page.id,
                                name: unusedPages.find(
                                  (unusedPage) => unusedPage.id === page.id
                                ).name
                              })
                              setDeletePageModalOpen(true)
                            }}
                          />
                          <div className="cardThumbnail">
                            <ImageIcon />
                          </div>
                          <Typography variant="body1">
                            {
                              unusedPages.find(
                                (unusedPage) => unusedPage.id === page.id
                              ).name
                            }
                          </Typography>
                        </CardContent>
                      </Card>
                    </Draggable>
                  )
                })}
              </Container>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default PageEditor
