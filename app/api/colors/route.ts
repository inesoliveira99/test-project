import { NextResponse } from 'next/server';

const colors = [
  { name: 'blue', hex: '#3B82F6', rgb: 'rgb(59, 130, 246)' },
  { name: 'red', hex: '#EF4444', rgb: 'rgb(239, 68, 68)' },
  { name: 'green', hex: '#10B981', rgb: 'rgb(16, 185, 129)' },
  { name: 'purple', hex: '#8B5CF6', rgb: 'rgb(139, 92, 246)' },
  { name: 'yellow', hex: '#F59E0B', rgb: 'rgb(245, 158, 11)' },
  { name: 'pink', hex: '#EC4899', rgb: 'rgb(236, 72, 153)' },
  { name: 'indigo', hex: '#6366F1', rgb: 'rgb(99, 102, 241)' },
  { name: 'teal', hex: '#14B8A6', rgb: 'rgb(20, 184, 166)' }
];

export async function GET() {
  return NextResponse.json({
    colors,
    total: colors.length,
    timestamp: new Date().toISOString()
  });
}

export async function POST() {
  // Return a random color
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return NextResponse.json({
    randomColor,
    timestamp: new Date().toISOString(),
    message: `Here's a random color: ${randomColor.name}`
  });
}