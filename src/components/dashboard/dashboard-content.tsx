"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuthStore } from "@/lib/auth";
import { createSupabaseClient } from "@/lib/supabase";
import { formatDate, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Activity, Bell, Calendar, Clock, Edit, ExternalLink, Info, Key, LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface UserStats {
  lastLogin: string;
  accountAge: number;
}

// Simulated activity data - in a real app you would fetch this from the backend
const activityItems = [
  { type: "login", date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), message: "Logged in from Chrome on Windows" },
  { type: "profile_update", date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), message: "Updated profile information" },
  { type: "settings", date: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), message: "Changed notification settings" },
];

export function DashboardContent() {
  const { user, signOut } = useAuthStore();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progressValue] = useState(66);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        const supabase = createSupabaseClient();
        const { data: authData } = await supabase.auth.getUser();
        
        if (authData?.user) {
          // Calculate account age
          const createdAt = user.created_at ? new Date(user.created_at) : new Date();
          const accountAge = Math.floor(
            (new Date().getTime() - createdAt.getTime()) / 
            (1000 * 60 * 60 * 24)
          );
          
          setUserStats({
            lastLogin: new Date().toISOString(),
            accountAge,
          });
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Welcome back, <span className="font-medium">{user.full_name || user.email.split("@")[0]}</span>
          </p>
        </div>
        <div className="mt-4 sm:mt-0 space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* User Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Profile Card */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-semibold">Profile Overview</CardTitle>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
              {getInitials(user.full_name || user.email)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mt-2">
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="text-sm">{user.full_name || "Not set"}</p>
              </div>
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="text-sm">{user.email}</p>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="text-sm">
                  Joined {user.created_at ? formatDate(user.created_at) : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 px-6">
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/profile">
                <Edit className="h-4 w-4 mr-2" />
                Update Profile
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Account Stats Card */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Activity Stats</CardTitle>
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <CardDescription>Your account activity</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-28">
                <p className="text-sm text-muted-foreground">Loading stats...</p>
              </div>
            ) : userStats ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">Profile Completion</p>
                    <Badge variant="outline">{progressValue}%</Badge>
                  </div>
                  <Progress value={progressValue} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Last login</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <p className="text-sm">{formatDate(userStats.lastLogin)}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Account age</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <p className="text-sm">{userStats.accountAge} days</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No stats available</p>
            )}
          </CardContent>
        </Card>
        
        {/* Quick Actions Card */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              <Settings className="h-5 w-5 text-green-500" />
            </div>
            <CardDescription>Common tasks and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button variant="outline" size="sm" className="justify-start h-auto py-3" asChild>
                <Link href="/profile">
                  <UserIcon className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <p className="text-xs font-medium">Edit Profile</p>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="justify-start h-auto py-3" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <p className="text-xs font-medium">Settings</p>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="justify-start h-auto py-3">
                <Bell className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <p className="text-xs font-medium">Notifications</p>
                </div>
              </Button>
              <Button variant="outline" size="sm" className="justify-start h-auto py-3">
                <Key className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <p className="text-xs font-medium">Security</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8">
              {activityItems.map((item, i) => (
                <div key={i} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {item.type === "login" && <LogOut className="h-5 w-5" />}
                      {item.type === "profile_update" && <Edit className="h-5 w-5" />}
                      {item.type === "settings" && <Settings className="h-5 w-5" />}
                    </div>
                    {i < activityItems.length - 1 && (
                      <div className="w-px grow bg-muted my-2"></div>
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-sm font-medium">{item.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(item.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 