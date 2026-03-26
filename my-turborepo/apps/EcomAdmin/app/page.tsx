import Appareachart from "@/components/shared/Appareachart";
import AppBarChart from "@/components/shared/Appbarchart";
import Apppiechart from "@/components/shared/Apppiechart";
import CardList from "@/components/shared/CardList";
import TodoList from "@/components/shared/TodoList";

export default function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div  className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2"><AppBarChart /></div>
      <div  className="bg-primary-foreground p-4 rounded-lg"><CardList title="Latest Transactions"/></div>

      <div  className="bg-primary-foreground p-4 rounded-lg"><Apppiechart /> </div>

      <div  className="bg-primary-foreground p-4 rounded-lg"><TodoList /></div>

      <div  className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2"><Appareachart /></div>


      <div  className="bg-primary-foreground p-4 rounded-lg"><CardList title="Popular Products" /></div>

    </div>
  )
}
