"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing, Globe, Lock, Mail, User } from "lucide-react";
import { useAuthStore } from "@/lib/auth";

const accountFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  securityAlerts: z.boolean().default(true),
  accountUpdates: z.boolean().default(true),
});

const privacyFormSchema = z.object({
  profileVisibility: z.enum(["public", "private", "contacts"]),
  twoFactorAuth: z.boolean().default(false),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
type PrivacyFormValues = z.infer<typeof privacyFormSchema>;

export function SettingsForm() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("account");
  const [accountSuccess, setAccountSuccess] = useState(false);
  const [notificationSuccess, setNotificationSuccess] = useState(false);
  const [privacySuccess, setPrivacySuccess] = useState(false);

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: user?.full_name || "",
      email: user?.email || "",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      marketingEmails: false,
      securityAlerts: true,
      accountUpdates: true,
    },
  });

  const privacyForm = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      profileVisibility: "public",
      twoFactorAuth: false,
    },
  });

  function onAccountSubmit(data: AccountFormValues) {
    console.log("Account settings updated:", data);
    // Here you would update the user's account settings in the backend
    setAccountSuccess(true);
    setTimeout(() => setAccountSuccess(false), 3000);
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    console.log("Notification settings updated:", data);
    // Here you would update the user's notification preferences in the backend
    setNotificationSuccess(true);
    setTimeout(() => setNotificationSuccess(false), 3000);
  }

  function onPrivacySubmit(data: PrivacyFormValues) {
    console.log("Privacy settings updated:", data);
    // Here you would update the user's privacy settings in the backend
    setPrivacySuccess(true);
    setTimeout(() => setPrivacySuccess(false), 3000);
  }

  if (!user) return null;

  return (
    <Tabs defaultValue="account" className="space-y-8" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account" className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          Account
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center">
          <BellRing className="h-4 w-4 mr-2" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex items-center">
          <Lock className="h-4 w-4 mr-2" />
          Privacy
        </TabsTrigger>
      </TabsList>

      {/* Account Settings */}
      <TabsContent value="account" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Manage your account details and user profile information.
            </CardDescription>
          </CardHeader>
          <Form {...accountForm}>
            <form onSubmit={accountForm.handleSubmit(onAccountSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={accountForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={accountForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input readOnly disabled {...field} />
                      </FormControl>
                      <FormDescription>
                        Your email address is used for account identification and security.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                {accountSuccess && (
                  <p className="text-sm text-green-600">Account settings saved!</p>
                )}
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Update your profile picture.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                <span className="text-3xl font-semibold text-primary-foreground">
                  {user.full_name ? user.full_name.substring(0, 2).toUpperCase() : user.email.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  Upload a new profile picture. Images should be square and at least 300x300px.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Upload New
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notification Settings */}
      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Customize which emails you receive from our application.
            </CardDescription>
          </CardHeader>
          <Form {...notificationsForm}>
            <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={notificationsForm.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <FormLabel>Email Notifications</FormLabel>
                        <FormDescription>
                          Receive email notifications about account activity.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={notificationsForm.control}
                  name="marketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <FormLabel>Marketing Emails</FormLabel>
                        <FormDescription>
                          Receive marketing and promotional emails.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={notificationsForm.control}
                  name="securityAlerts"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <FormLabel>Security Alerts</FormLabel>
                        <FormDescription>
                          Receive emails about security events related to your account.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={notificationsForm.control}
                  name="accountUpdates"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <FormLabel>Account Updates</FormLabel>
                        <FormDescription>
                          Receive emails about changes to your account settings.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                {notificationSuccess && (
                  <p className="text-sm text-green-600">Notification settings saved!</p>
                )}
                <Button type="submit">Save Preferences</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>

      {/* Privacy Settings */}
      <TabsContent value="privacy" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>
              Manage your privacy and security preferences.
            </CardDescription>
          </CardHeader>
          <Form {...privacyForm}>
            <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={privacyForm.control}
                  name="profileVisibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Visibility</FormLabel>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="public"
                            value="public"
                            checked={field.value === "public"}
                            onChange={() => field.onChange("public")}
                            className="h-4 w-4"
                          />
                          <label htmlFor="public" className="text-sm font-medium">
                            Public (Everyone can see your profile)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="private"
                            value="private"
                            checked={field.value === "private"}
                            onChange={() => field.onChange("private")}
                            className="h-4 w-4"
                          />
                          <label htmlFor="private" className="text-sm font-medium">
                            Private (Only you can see your profile)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="contacts"
                            value="contacts"
                            checked={field.value === "contacts"}
                            onChange={() => field.onChange("contacts")}
                            className="h-4 w-4"
                          />
                          <label htmlFor="contacts" className="text-sm font-medium">
                            Contacts Only (Only your contacts can see your profile)
                          </label>
                        </div>
                      </div>
                      <FormDescription>
                        Control who can view your profile information.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={privacyForm.control}
                  name="twoFactorAuth"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <FormLabel>Two-Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two-factor authentication for added security.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                {privacySuccess && (
                  <p className="text-sm text-green-600">Privacy settings saved!</p>
                )}
                <Button type="submit">Save Settings</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Data and Privacy</CardTitle>
            <CardDescription>
              Manage your data and privacy options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Download Your Data</h3>
              <p className="text-sm text-muted-foreground">
                You can request a copy of your personal data from our application.
              </p>
              <Button variant="outline" size="sm" disabled>
                Request Data Export
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-destructive">Delete Account</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" size="sm" disabled>
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
} 