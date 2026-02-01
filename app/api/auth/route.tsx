import crypto from "crypto"
import { cookies } from "next/headers";
import scalekit from "@/lib/scalekit";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const state=crypto.randomBytes(16).toString("hex");
        (await cookies()).set("sk_state",state,{httpOnly:true,sameSite:"lax",path:"/",} );
        const redirectUri=process.env.SCALEKIT_REDIRECT_URI!;

        const options={
            scopes:['openid','profle','email','offline_access'],
            state
        };
        const authorizationUrl=scalekit.getAuthorizationUrl(redirectUri,options);

        return NextResponse.redirect(authorizationUrl)
    } catch (error) {
        console.log(error);
    }
}
