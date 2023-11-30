type UserT = {
    email: string,
    name: string,
    loggedInAt: Date | null,
    accessToken: string | null
    sessionValidUntil: Date | null,
}

export type { UserT }
