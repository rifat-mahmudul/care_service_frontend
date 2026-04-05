"use client";

import React, { useState, useEffect } from "react";
import { useForm, type Control, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Plus, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  zip: z.string().optional(),
  experience: z.number().optional(),
  // Multi-select fields (Only for "find job" role)
  language: z.array(z.string()).default([]),
  agegroup: z.array(z.string()).default([]),
  education: z.array(z.string()).default([]),
  canHelpWith: z.array(z.string()).default([]),
  professionalSkill: z.array(z.string()).default([]),
  perferences: z.array(z.string()).default([]),
});

// Type inference from the schema input to match the zod resolver
type ProfileFormValues = z.input<typeof profileSchema>;

const EditProfilePage = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  // Tag input states for multiple values
  const [currentSkillTag, setCurrentSkillTag] = useState("");
  const [currentLanguageTag, setCurrentLanguageTag] = useState("");
  const [currentEducationTag, setCurrentEducationTag] = useState("");
  const [currentAgeGroupTag, setCurrentAgeGroupTag] = useState("");
  const [currentCanHelpWithTag, setCurrentCanHelpWithTag] = useState("");
  const [currentPreferenceTag, setCurrentPreferenceTag] = useState("");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: session?.user?.email || "",
      phone: "",
      bio: "",
      zip: "",
      experience: 0,
      language: [],
      agegroup: [],
      education: [],
      canHelpWith: [],
      professionalSkill: [],
      perferences: [],
    },
  });

  const formControl = form.control as unknown as Control<ProfileFormValues>;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.accessToken) {
        setIsFetching(false);
        return;
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const result = await response.json();
        const data = result.data;

        form.reset({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
          zip: data.zip || "",
          experience: data.exprience || data.experience || 0,
          language: data.language || [],
          agegroup: data.agegroup || [],
          education: data.education || [],
          canHelpWith: data.canHelpWith || [],
          professionalSkill: data.professionalSkill || [],
          perferences: [],
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, [session, form]);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to handle multi-item fields (Tags)
  const addTag = (field: keyof ProfileFormValues, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (!value.trim()) return;
    const currentValues = form.getValues(field) as string[] || [];
    if (!currentValues.includes(value.trim())) {
      form.setValue(field, [...currentValues, value.trim()]);
    }
    setter("");
  };

  const removeTag = (field: keyof ProfileFormValues, value: string) => {
    const currentValues = form.getValues(field) as string[] || [];
    form.setValue(field, currentValues.filter((item: string) => item !== value));
  };

  return (
    <div className="mx-auto border shadow-lg p-5 rounded-xl">
      {isFetching ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading profile...</span>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-black">Edit Profile</h1>
            <p className="text-gray-500">Update your personal information and expertise.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={formControl}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">First Name *</FormLabel>
                  <FormControl>
                    <Input {...field} className="focus-visible:ring-[#00D1C1]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formControl}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="focus-visible:ring-[#00D1C1]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={formControl}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="bg-gray-50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formControl}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={formControl}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip / Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. 1212, Dhaka" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={formControl}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    className="min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Only Show these fields if role is "find job" */}
          {session?.user?.role === "find job" && (
            <div className="space-y-6 pt-4 border-t border-gray-100">
              <h3 className="font-semibold text-black text-lg">Professional Details</h3>
              
              {/* Experience Level */}
              <FormField
                control={formControl}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (Years)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Multi-Item: Professional Skills */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">Professional Skills</Label>
                <div className="flex gap-2">
                  <Input 
                    value={currentSkillTag} 
                    onChange={(e) => setCurrentSkillTag(e.target.value)}
                    placeholder="Add a skill (e.g., React, Python)..." 
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag("professionalSkill", currentSkillTag, setCurrentSkillTag);
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={() => addTag("professionalSkill", currentSkillTag, setCurrentSkillTag)}
                    className="bg-[#00D1C1] hover:bg-[#00b8aa]"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.watch("professionalSkill")?.map((skill: string, index: number) => (
                    <span key={index} className="bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {skill}
                      <X size={14} className="cursor-pointer hover:text-red-400" onClick={() => removeTag("professionalSkill", skill)} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">Languages</Label>
                <div className="flex gap-2">
                  <Input 
                    value={currentLanguageTag} 
                    onChange={(e) => setCurrentLanguageTag(e.target.value)}
                    placeholder="Add a language (e.g., English, Bengali)..." 
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag("language", currentLanguageTag, setCurrentLanguageTag);
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={() => addTag("language", currentLanguageTag, setCurrentLanguageTag)}
                    className="bg-[#00D1C1] hover:bg-[#00b8aa]"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.watch("language")?.map((lang: string, index: number) => (
                    <span key={index} className="bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {lang}
                      <X size={14} className="cursor-pointer hover:text-red-400" onClick={() => removeTag("language", lang)} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">Education</Label>
                <div className="flex gap-2">
                  <Input 
                    value={currentEducationTag} 
                    onChange={(e) => setCurrentEducationTag(e.target.value)}
                    placeholder="Add education (e.g., B.Sc in CSE)..." 
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag("education", currentEducationTag, setCurrentEducationTag);
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={() => addTag("education", currentEducationTag, setCurrentEducationTag)}
                    className="bg-[#00D1C1] hover:bg-[#00b8aa]"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.watch("education")?.map((edu: string, index: number) => (
                    <span key={index} className="bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {edu}
                      <X size={14} className="cursor-pointer hover:text-red-400" onClick={() => removeTag("education", edu)} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Age Group */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">Age Group Preference</Label>
                <div className="flex gap-2">
                  <Input 
                    value={currentAgeGroupTag} 
                    onChange={(e) => setCurrentAgeGroupTag(e.target.value)}
                    placeholder="Add age group (e.g., 5-10, 11-15)..." 
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag("agegroup", currentAgeGroupTag, setCurrentAgeGroupTag);
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={() => addTag("agegroup", currentAgeGroupTag, setCurrentAgeGroupTag)}
                    className="bg-[#00D1C1] hover:bg-[#00b8aa]"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.watch("agegroup")?.map((age: string, index: number) => (
                    <span key={index} className="bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {age}
                      <X size={14} className="cursor-pointer hover:text-red-400" onClick={() => removeTag("agegroup", age)} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Can Help With */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">Can Help With</Label>
                <div className="flex gap-2">
                  <Input 
                    value={currentCanHelpWithTag} 
                    onChange={(e) => setCurrentCanHelpWithTag(e.target.value)}
                    placeholder="Add subject (e.g., Mathematics, Physics)..." 
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag("canHelpWith", currentCanHelpWithTag, setCurrentCanHelpWithTag);
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={() => addTag("canHelpWith", currentCanHelpWithTag, setCurrentCanHelpWithTag)}
                    className="bg-[#00D1C1] hover:bg-[#00b8aa]"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.watch("canHelpWith")?.map((subject: string, index: number) => (
                    <span key={index} className="bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {subject}
                      <X size={14} className="cursor-pointer hover:text-red-400" onClick={() => removeTag("canHelpWith", subject)} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">Preferences</Label>
                <div className="flex gap-2">
                  <Input 
                    value={currentPreferenceTag} 
                    onChange={(e) => setCurrentPreferenceTag(e.target.value)}
                    placeholder="Add preference..." 
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag("perferences", currentPreferenceTag, setCurrentPreferenceTag);
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={() => addTag("perferences", currentPreferenceTag, setCurrentPreferenceTag)}
                    className="bg-[#00D1C1] hover:bg-[#00b8aa]"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.watch("perferences")?.map((pref: string, index: number) => (
                    <span key={index} className="bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {pref}
                      <X size={14} className="cursor-pointer hover:text-red-400" onClick={() => removeTag("perferences", pref)} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary hover:bg-[#042a2a] text-white px-8 h-12 rounded-lg"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
        </>
      )}
    </div>
  );
};

export default EditProfilePage;