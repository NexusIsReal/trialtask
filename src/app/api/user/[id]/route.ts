import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;
    
  if (!id) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }
  
  try {
    // Create Supabase client
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );
    
    // Get user details
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, full_name, created_at, updated_at, avatar_url")
      .eq("id", id)
      .single();
    
    if (error) {
      console.error("API error:", error);
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 500 }
      );
    }
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Process user data
    const userResponse = {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      avatarUrl: user.avatar_url,
    };
    
    return NextResponse.json(userResponse);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 