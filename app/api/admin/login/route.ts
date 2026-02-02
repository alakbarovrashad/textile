import { authenticateAdmin, createAdminSession } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export async function POST(req:Request) {
    
    const body = await req.json();
    console.log("📌 [LOGIN] 2.1) Body:", body);
    
    console.log("📌 [LOGIN] 3) Zod validation çalışıyor...");
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
        console.log("❌ [LOGIN] 3.1) Validation FAILED:", parsed.error.issues);
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    
    console.log("✅ [LOGIN] 3.1) Validation OK:", parsed.data);

    const admin = await authenticateAdmin(
        parsed.data.email,
        parsed.data.password
    );

      if (!admin) {
         return NextResponse.json(
            { error: "Wrong email or password" },
            { status: 401 }
        );
      }

    await createAdminSession(admin);

    return NextResponse.json({ success: true });



    
}
