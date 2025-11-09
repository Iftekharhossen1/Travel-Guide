import { GoogleGenAI, Type } from "@google/genai";
import { DestinationDetails } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const schema: DestinationDetails = {
    howToGo: "",
    policies: "",
    bestTimeToVisit: "",
    hotels: [],
    tipsAndTricks: [],
    dos: [],
    donts: [],
    famousFoods: [],
    thingsToAvoid: [],
};


export const getDestinationDetails = async (destinationName: string): Promise<DestinationDetails> => {
    try {
        const prompt = `"${destinationName}, বাংলাদেশ" এর জন্য একটি বিস্তারিত ভ্রমণ নির্দেশিকা প্রদান করুন। পর্যটকদের জন্য নিম্নলিখিত প্রতিটি বিভাগের জন্য আমার বিস্তারিত তথ্য প্রয়োজন। অনুগ্রহ করে নির্দিষ্ট এবং সহায়ক হন।

1.  **কিভাবে যাবেন (How to Go)**: ঢাকা, বাংলাদেশ থেকে বিস্তারিত ভ্রমণের নির্দেশাবলী। বিভিন্ন পরিবহন ব্যবস্থা (বাস, ট্রেন, বিমান) সহ আনুমানিক খরচ এবং ভ্রমণের সময় অন্তর্ভুক্ত করুন।
2.  **অনুসরণীয় নীতি (Policies to Follow)**: যেকোনো স্থানীয় নিয়ম, প্রবিধান, বা সাংস্কৃতিক শিষ্টাচার যা পর্যটকদের অবশ্যই সচেতন থাকতে হবে।
3.  **পরিদর্শনের সেরা সময় (Best Time to Visit)**: পরিদর্শনের জন্য আদর্শ মাস বা ঋতু, কারণ ব্যাখ্যা সহ (আবহাওয়া, উৎসব, ইত্যাদি)।
4.  **জনপ্রিয় হোটেল (Popular Hotels)**: বাজেট থেকে বিলাসবহুল বিকল্প পর্যন্ত ৩-৫টি জনপ্রিয় হোটেল বা রিসোর্টের একটি তালিকা।
5.  **ভ্রমণ টিপস এবং কৌশল (Travel Tips and Tricks)**: সেখানে আরও ভালো ভ্রমণের অভিজ্ঞতার জন্য কার্যকরী টিপস।
6.  **কী করবেন (Dos)**: অবশ্যই করণীয় কার্যকলাপ বা অভিজ্ঞতার একটি তালিকা।
7.  **কী করবেন না (Don'ts)**: নিরাপত্তা বা সাংস্কৃতিক কারণে এড়িয়ে চলার মতো জিনিসের একটি তালিকা।
8.  **বিখ্যাত খাবার (Famous Foods)**: স্থানীয় রন্ধনপ্রণালীর বিশেষত্বের একটি তালিকা যা দর্শকদের অবশ্যই চেষ্টা করা উচিত।
9.  **যা এড়িয়ে চলবেন (Things to Avoid)**: সম্ভাব্য স্ক্যাম, বিপজ্জনক এলাকা, বা সতর্ক থাকার মতো বিষয় সম্পর্কে নির্দিষ্ট সতর্কতা।

অনুগ্রহ করে সমস্ত তথ্য বাংলা ভাষায় একটি JSON অবজেক্ট ফরম্যাটে ফেরত দিন।
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        howToGo: { type: Type.STRING, description: "কিভাবে যাবেন" },
                        policies: { type: Type.STRING, description: "অনুসরণীয় নীতি" },
                        bestTimeToVisit: { type: Type.STRING, description: "পরিদর্শনের সেরা সময়" },
                        hotels: { type: Type.ARRAY, items: { type: Type.STRING }, description: "জনপ্রিয় হোটেল" },
                        tipsAndTricks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "ভ্রমণ টিপস এবং কৌশল" },
                        dos: { type: Type.ARRAY, items: { type: Type.STRING }, description: "কী করবেন" },
                        donts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "কী করবেন না" },
                        famousFoods: { type: Type.ARRAY, items: { type: Type.STRING }, description: "বিখ্যাত খাবার" },
                        thingsToAvoid: { type: Type.ARRAY, items: { type: Type.STRING }, description: "যা এড়িয়ে চলবেন" },
                    },
                    required: Object.keys(schema),
                },
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as DestinationDetails;

    } catch (error) {
        console.error("Error fetching destination details from Gemini:", error);
        throw new Error("ভ্রমণ নির্দেশিকা আনতে ব্যর্থ। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।");
    }
};