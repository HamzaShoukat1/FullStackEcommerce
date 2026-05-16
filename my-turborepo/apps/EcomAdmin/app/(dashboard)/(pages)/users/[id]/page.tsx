
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import getFormattedCreationDate from "@/app/utils";
import { getSingleUserDetails } from "@/services/admin.service";
import { cookies } from "next/headers";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Candy, Citrus, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLineChart from "@/components/shared/Applinechart";
import EditUserButton from "@/components/shared/EditUserinfo";


interface PageProps {
  params: Promise<{ id: string }>;
}


const SingleUserPage = async ({ params }: PageProps) => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("accessToken")?.value;

  if (!authToken) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-semibold text-red-500">Unauthorized</h1>
        <p className="text-muted-foreground mt-2">You must be logged in to view this page.</p>
      </div>
    );
  }
  const resolvedParams = await params;
  const idParam = Number(resolvedParams.id);


  let data = null;

  try {
    const response = await getSingleUserDetails(idParam, authToken);
    // If your service already extracts JSON data automatically, you can remove '.json()'
    data = typeof response.json === "function" ? await response.json() : response;

    if (!data) {
      return (
        <div className="p-4 md:p-6">
          <h1 className="text-2xl font-semibold">User Not Found</h1>
          <p className="text-muted-foreground mt-2">The user you are looking for does not exist.</p>
        </div>
      );
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    
  }










  // Safe structural fallback mappings for fallback rendering
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim() || "Unknown User";
  const initials = `${data.firstName?.[0] || ""}${data.lastName?.[0] || ""}`.toUpperCase() || "U";

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/users">Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{fullName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* CONTAINER */}
      <div className="mt-4 flex flex-col xl:flex-row gap-8">
        {/* LEFT PROFILE PANEL */}
        <div className="w-full xl:w-1/3 space-y-6">
          {/* USER BADGES CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg border">
            <h1 className="text-xl font-semibold">User Badges</h1>
            <div className="flex gap-4 mt-4">
              <HoverCard>
                <HoverCardTrigger>
                  <BadgeCheck
                    size={36}
                    className="rounded-full bg-blue-500/30 border border-blue-500/50 p-2 cursor-pointer"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-bold mb-2">Verified User</h1>
                  <p className="text-sm text-muted-foreground">
                    This user has been verified by the admin system.
                  </p>
                </HoverCardContent>
              </HoverCard>

              {data.role?.toLowerCase() === "admin" && (
                <HoverCard>
                  <HoverCardTrigger>
                    <Shield
                      size={36}
                      className="rounded-full bg-green-800/30 border border-green-800/50 p-2 cursor-pointer"
                    />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <h1 className="font-bold mb-2">System Admin</h1>
                    <p className="text-sm text-muted-foreground">
                      Admin users hold permission overrides to execute core system operations.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              )}

              <HoverCard>
                <HoverCardTrigger>
                  <Candy
                    size={36}
                    className="rounded-full bg-yellow-500/30 border border-yellow-500/50 p-2 cursor-pointer"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-bold mb-2">Awarded</h1>
                  <p className="text-sm text-muted-foreground">
                    This user has been awarded for platform contributions.
                  </p>
                </HoverCardContent>
              </HoverCard>

              <HoverCard>
                <HoverCardTrigger>
                  <Citrus
                    size={36}
                    className="rounded-full bg-orange-500/30 border border-orange-500/50 p-2 cursor-pointer"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <h1 className="font-bold mb-2">Popular</h1>
                  <p className="text-sm text-muted-foreground">
                    This user maintains high engagement across store boards.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>

          {/* USER CARD CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg space-y-2 border">
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                {/* <AvatarImage src={data.avatarUrl || undefined} alt={fullName} /> */}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-semibold">{fullName}</h1>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Account status is active. User profile datasets populate metadata summaries generated from system transactions automatically.
            </p>
          </div>

          {/* INFORMATION CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">User Information</h1>
                <EditUserButton userData={data} />
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex flex-col gap-2 mb-6">
                <p className="text-sm text-muted-foreground">Profile completion</p>
                <Progress value={data.email ? 100 : 66} className="h-2" />
              </div>

              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="font-medium text-muted-foreground">First name:</span>
                <span className="font-semibold">{data.firstName || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="font-medium text-muted-foreground">Last name:</span>
                <span className="font-semibold">{data.lastName || "—"}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="font-medium text-muted-foreground">Email address:</span>
                <span className="font-semibold select-all">{data.email || "—"}</span>
              </div>
              <div className="flex items-center justify-between pb-2 text-sm">
                <span className="font-medium text-muted-foreground">System Role:</span>
                <span className="capitalize font-semibold text-primary">{data.role || "user"}</span>
              </div>
            </div>

            {data.createdAt && (
              <p className="text-xs text-muted-foreground mt-6 pt-4 border-t text-right">
                Joined: {getFormattedCreationDate(data.createdAt)}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT METRICS DISPLAY */}
        <div className="w-full xl:w-2/3 space-y-6">
          <div className="bg-primary-foreground p-4 rounded-lg border">
            <h1 className="text-xl font-semibold mb-4">User Activity</h1>
            <AppLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
