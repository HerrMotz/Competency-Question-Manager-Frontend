type UserT = {
    username: string,
    loggedInAt: Date | null,
    sessionValidUntil: Date | null,
    accessToken: string | null
}

export type { UserT }
