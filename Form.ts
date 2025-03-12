//chat-gpt generated

import {z} from "zod";

// Schema for Display objects
const DisplaySchema = z.object({
    CurrentModeWidth: z.number(),
    CurrentModeHeight: z.number(),
});

// Schema for RHIAdapter
const RHIAdapterSchema = z.object({
    AdapterName: z.string(),
    AdapterInternalDriverVersion: z.string(),
    AdapterUserDriverVersion: z.string(),
    AdapterDriverDate: z.string(),
    AdapterDedicatedMemoryMB: z.string(),
});

// Schema for BenchmarkStat
const BenchmarkStatSchema = z.object({
    Description: z.string(),
    PerformanceIndex: z.number(),
    ValueType: z.string(),
    NormalizedTime: z.number(),
    MeasuredTotalTime: z.number(),
    Confidence: z.number(),
    Weight: z.number(),
});

// Schema for SynthBenchmark
const SynthBenchmarkSchema = z.object({
    CPUStats: z.array(BenchmarkStatSchema),
    CPUPerfIndex: z.number(),
    GPUStats: z.array(BenchmarkStatSchema),
    GPUPerfIndex: z.number(),
    TotalGPUTime: z.number(),
});

// Schema for HardwareSurvey
const HardwareSurveySchema = z.object({
    Platform: z.string(),
    OSVersion: z.string(),
    OSSubVersion: z.string(),
    OSBits: z.number(),
    OSLanguage: z.string(),
    RenderingAPI: z.string(),
    HardDriveGB: z.number(),
    HardDriveFreeMB: z.number(),
    MemoryMB: z.number(),
    CPUPerformanceIndex: z.number(),
    GPUPerformanceIndex: z.number(),
    RAMPerformanceIndex: z.number(),
    bIsLaptopComputer: z.boolean(),
    bIsRemoteSession: z.boolean(),
    CPUCount: z.number(),
    CPUClockGHz: z.number(),
    CPUBrand: z.string(),
    CPUNameString: z.string(),
    CPUInfo: z.number(),
    DisplayCount: z.number(),
    Displays: z.array(DisplaySchema),
    RHIAdapter: RHIAdapterSchema,
    ErrorCount: z.number(),
    LastSurveyError: z.string(),
    LastSurveyErrorDetail: z.string(),
    LastPerformanceIndexError: z.string(),
    LastPerformanceIndexErrorDetail: z.string(),
    SynthBenchmark: SynthBenchmarkSchema,
});

// Schema for Form
export const FormSchema = z.object({
    FormData: z.record(z.any()), // Generic object for form data
    Playtime: z.number(),
    Date: z.string(), // ISO8601 date format (generated using `new Date().toISOString()`)
    Version: z.string(),
    HardwareSurvey: HardwareSurveySchema.optional(), // Optional, based on AllowHardwareInfo
});

// TypeScript types based on Zod schemas
export type Form = z.infer<typeof FormSchema>;
export type HardwareSurvey = z.infer<typeof HardwareSurveySchema>