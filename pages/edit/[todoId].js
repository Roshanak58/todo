import EditTodoPage from "@/components/template/EditTodoPage"
import { useRouter } from "next/router"


function Index() {
    const router=useRouter()
    const {id, title,caption,status}=router.query
    // const todoId="68d36eb6d4eca0786a8c30fc"
// const {query}=router
    console.log("EditId::",id)

  return (<EditTodoPage id={id} title={title} caption={caption} status={status}/>
  )
}

export default Index