"use server";

import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { prisma } from "@/lib/client";

const RequestSchema = z.object({
  serviceType: z.string(),
  gardenStyle: z.array(z.string()),
  deadline: z.string(),
  budget: z.string(),
  addons: z.array(z.string()),
  // Contact Info
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "Wachtwoord moet minimaal 6 tekens zijn"),
  number: z.string(),
  zipCode: z.string(),
  city: z.string(),
  fileUrls: z.array(z.string()).optional(),
});

export async function createRequest(data: z.infer<typeof RequestSchema>) {
  const result = RequestSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation error:", result.error);
    return { success: false, error: "Ongeldige invoer." };
  }

  const {
    serviceType,
    gardenStyle,
    deadline,
    budget,
    addons,
    firstName,
    lastName,
    email,
    password,
    number,
    zipCode,
    city,
    fileUrls,
  } = result.data;

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "Er bestaat al een account met dit e-mailadres." };
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create User and Request in a transaction (or sequential, but transaction checks consistency)
    // Using explicit sequential for better control or nested create
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword: hashedPassword,
        phoneNumber: number,
        zipCode,
        city,
      },
    });

    // 4. Create Request linked to User
    const newRequest = await prisma.request.create({
      data: {
        serviceType,
        gardenStyle: gardenStyle.join(", "),
        deadline,
        budget,
        addons: addons.join(", "),
        userId: user.id,
        files: {
          create: fileUrls?.map((url) => ({
            url,
          })),
        },
      },
    });

    return { success: true, requestId: newRequest.id };
  } catch (error) {
    console.error("Error creating request:", error);
    return { success: false, error: `Er is iets misgegaan: ${(error as Error).message}` };
  }
}
