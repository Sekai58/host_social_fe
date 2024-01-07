import {z} from "zod"

export const UserLoginSchema = z.object({
    email: z.string().email("Please enter valid email"),
    password: z.string().min(1,{message:"Password is required"})
})

export const UserRegisterSchema = z.object({
    email: z.string().email("Please enter valid email"),
    userName: z.string().min(3,{message:"Must be at least 3 character"}).max(15,{message:"Must be less than 15 character"}).refine((value) => value.trim() !== '', {
        message: 'Space-only values are not allowed'}),
    fullName: z.string().min(3,{message:"Must be at least 3 character"}).max(30,{message:"Must be less than 30 character"}).refine((value) => value.trim() !== '', {
        message: 'Space-only values are not allowed'}),
    password: z.string().min(8,{message:"Must be at least 8 characters"})
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
                    message: 'Must contain at least one uppercase, one lowercase, one number, and one special character'}),
    file: z.string().max(1024 * 1024, 'File size is too large (max 1MB)').optional()
})

export const ForgetPasswordSchema  = z.object({
    email:z.string().email("Please enter valid email")
})

export const ResetPasswordSchema = z.object({
    password: z.string().min(8,{message:"Must be at least 8 characters"})
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
                    message: 'Must contain at least one uppercase, one lowercase, one number, and one special character'}),
    confirmPassword:z.string()
    }).refine((value) => value.password === value.confirmPassword, {
        message: 'Password must match',
        path:["confirmPassword"]
})


export const AddPostSchema = z.object({
    content: z.string().min(1,{message:''}),
    file: z.any().optional()
})

export const CommentPostSchema = z.object({
    comment:z.string().refine((value) => value.trim() !== '', {
        message: 'Enter some content'})
})

export const SearchUserSchema = z.object({
    query:z.string().refine((value) => value.trim() !== '', {
        message: 'Enter some content'})
})

export const FriendRequestSchema = z.object({
    requestFrom: z.string(),
    requestTo: z.string()
})