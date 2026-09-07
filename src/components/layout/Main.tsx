import { Content } from "./Content"
import { Header } from "./Header"


export const Main = () => {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
        <Header/>
        <Content/>
    </div>
  )
}
