import * as z from "zod"

const input = {
    username: "Dolapo",
    age: 12,
    dob: '12-12-12'
}

const User = z.object({
    username: z.string(),
    age: z.number().min(3)
})



    console.log(User.safeParse(input).error)


// console.log(User.parse({...input}))