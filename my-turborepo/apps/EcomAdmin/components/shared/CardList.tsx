import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { OrderDTO, productType } from "@repo/shared";
import { getProductsinHome } from "@/services/product.service";
import { getallorderinHome } from "@/services/order.service";
import { cookies } from "next/headers";


const CardList = async ({ title }: { title: string }) => {
  const cookiesData = await cookies();
  const authToken = cookiesData.get("accessToken")?.value;
  let products: productType[] = []
  let orders: OrderDTO[] = []

  if (title === "Popular Products") {
    products = await getProductsinHome()
  } else {
    orders = await getallorderinHome(authToken ?? '')
  }
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {title === "Popular Products"
          ? products.map((item) => (
            <Card
              key={item.id}
              className="flex-row items-center justify-between gap-4 p-4"
            >
              <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                <Image
                  src={Object.values(item.images as Record<string,string>)[0] || ""}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="flex-1 p-0">
                <CardTitle className="text-sm font-medium">
                  {item.name}
                </CardTitle>
              </CardContent>
              <CardFooter className="p-0">${item.price.toString()}</CardFooter>
            </Card>
          ))
          : orders.map((item) => (
            <Card
              key={item.id}
              className="flex-row  mb-2 items-center justify-between gap-4 p-4 py-6"
            >
           
              <CardContent className="flex-1 p-0">
                <CardTitle className="text-sm  font-medium">
                  {item.email}
                </CardTitle>
                <Badge variant="secondary" className="mb-3">{item.status}</Badge>
              </CardContent>
              <CardFooter className="p-0">${item.amount}</CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CardList;