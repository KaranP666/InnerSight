"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { MoodLog, Mood } from "@/types"

const moodToValue: Record<Mood, number> = {
    'Sad': 1,
    'Anxious': 2,
    'Okay': 3,
    'Calm': 4,
    'Happy': 5,
}

const valueToMood: Record<number, Mood> = {
    1: 'Sad',
    2: 'Anxious',
    3: 'Okay',
    4: 'Calm',
    5: 'Happy',
}


export function MoodChart({ data }: { data: MoodLog[] }) {
    const chartData = data
        .map(log => ({
            date: new Date(log.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            mood: moodToValue[log.mood],
            fullDate: new Date(log.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            note: log.note
        }))
        .reverse();

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        domain={[0, 5]} 
                        ticks={[1, 2, 3, 4, 5]}
                        tickFormatter={(value) => valueToMood[value]}
                    />
                    <Tooltip
                        contentStyle={{
                            background: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                        }}
                        labelStyle={{
                            color: "hsl(var(--foreground))"
                        }}
                        formatter={(value, name, props) => [`${valueToMood[Number(value)]}${props.payload.note ? `: ${props.payload.note}`: ''}`, 'Mood']}
                        labelFormatter={(label) => chartData.find(d=>d.date === label)?.fullDate}
                    />
                    <Bar dataKey="mood" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
