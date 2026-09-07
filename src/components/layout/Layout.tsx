import { Main } from "./Main"
import { Sidebar } from "./Sidebar"


export const Layout = () => {
  return (
    <div className="flex ">
        <Sidebar/>
        <Main/>
    </div>
  )
}
