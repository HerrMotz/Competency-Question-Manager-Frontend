type UserT = {
    id: string, // uuid
    email: string,
    name: string,
    loggedInAt: Date | null,
    accessToken: string | null
    sessionValidUntil: Date | null,
    isSystemAdmin: boolean
}

type UserReducedT = {
    id: string,
    email: string,
    name: string
}
