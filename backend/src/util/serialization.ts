export function serializeUser(user:any){
    if(user.password)
    delete user.password
    return user
}