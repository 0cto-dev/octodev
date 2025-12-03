import { connectDB } from "@/lib/mongodb";
import User from "@/models/Users";
import { currentDate } from "@/types/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("test");
  try {
    await connectDB();

    const { userId } = await req.json();
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    console.log(userId)
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    
    console.log(user)
    // 24*60*60*1000 é a quantidade de milissegundos em um dia
    const yesterdayDate = new Date(Date.now() - (24*60*60*1000)).toISOString().split("T")[0];

    if (user.lastLessonDate === currentDate) {
      return NextResponse.json({ streak: user.streak, already: true });
    }

    if (user.lastLessonDate === yesterdayDate) {
      user.streak += 1;
    } else {
      user.streak = 1; 
    }
    user.lastLessonDate = currentDate;
    console.log(user)

    await user.save();
    console.log(user)

    return NextResponse.json({ streak: user.streak, reset: user.streak === 1 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
