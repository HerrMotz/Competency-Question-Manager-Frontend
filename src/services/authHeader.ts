import { useStore } from "../store.ts";
const useStore1 = useStore()
const { getUser } = useStore1

export default function authHeader() {
    const user = getUser

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}