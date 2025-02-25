//chat-gpt generated

import { z } from "zod";

// Schema for Display objects
const DisplaySchema = z.object({
    currentModeWidth: z.number(),
    currentModeHeight: z.number(),
});

// Schema for RHIAdapter
const RHIAdapterSchema = z.object({
    adapterName: z.string(),
    adapterInternalDriverVersion: z.string(),
    adapterUserDriverVersion: z.string(),
    adapterDriverDate: z.string(),
    adapterDedicatedMemoryMB: z.string(),
});

// Schema for BenchmarkStat
const BenchmarkStatSchema = z.object({
    description: z.string(),
    performanceIndex: z.number(),
    valueType: z.string(),
    normalizedTime: z.number(),
    measuredTotalTime: z.number(),
    confidence: z.number(),
    weight: z.number(),
});

// Schema for SynthBenchmark
const SynthBenchmarkSchema = z.object({
    cpuStats: z.array(BenchmarkStatSchema),
    cpuPerfIndex: z.number(),
    gpuStats: z.array(BenchmarkStatSchema),
    gpuPerfIndex: z.number(),
    totalGPUTime: z.number(),
});

// Schema for HardwareSurvey
const HardwareSurveySchema = z.object({
    platform: z.string(),
    osVersion: z.string(),
    osSubVersion: z.string(),
    osBits: z.number(),
    osLanguage: z.string(),
    renderingAPI: z.string(),
    hardDriveGB: z.number(),
    hardDriveFreeMB: z.number(),
    memoryMB: z.number(),
    cpuPerformanceIndex: z.number(),
    gpuPerformanceIndex: z.number(),
    ramPerformanceIndex: z.number(),
    bIsLaptopComputer: z.boolean(),
    bIsRemoteSession: z.boolean(),
    cpuCount: z.number(),
    cpuClockGHz: z.number(),
    cpuBrand: z.string(),
    cpuNameString: z.string(),
    cpuInfo: z.number(),
    displayCount: z.number(),
    displays: z.array(DisplaySchema),
    rhiAdapter: RHIAdapterSchema,
    errorCount: z.number(),
    lastSurveyError: z.string(),
    lastSurveyErrorDetail: z.string(),
    lastPerformanceIndexError: z.string(),
    lastPerformanceIndexErrorDetail: z.string(),
    synthBenchmark: SynthBenchmarkSchema,
});

// Schema for Form
export const FormSchema = z.object({
    formData: z.record(z.any()), // Generic object for form data
    playtime: z.number(),
    date: z.string(), // ISO8601 date format (generated using `new Date().toISOString()`)
    hardwareSurvey: HardwareSurveySchema.optional(), // Optional, based on AllowHardwareInfo
});

// TypeScript types based on Zod schemas
export type Form = z.infer<typeof FormSchema>;
export type HardwareSurvey = z.infer<typeof HardwareSurveySchema>