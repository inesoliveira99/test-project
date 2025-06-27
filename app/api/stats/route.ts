import { NextResponse } from 'next/server';

// In a real app, you'd store this in a database
let stats = {
  totalClicks: 0,
  uniqueVisitors: 0,
  lastClickTime: null as string | null,
  popularColors: {
    blue: 0,
    red: 0,
    green: 0,
    purple: 0,
    yellow: 0,
    pink: 0,
    indigo: 0,
    teal: 0
  }
};

export async function GET() {
  return NextResponse.json({
    ...stats,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, color } = body;
    
    if (action === 'click' && color) {
      stats.totalClicks += 1;
      stats.lastClickTime = new Date().toISOString();
      
      if (stats.popularColors.hasOwnProperty(color)) {
        stats.popularColors[color as keyof typeof stats.popularColors] += 1;
      }
    }
    
    if (action === 'visit') {
      stats.uniqueVisitors += 1;
    }
    
    return NextResponse.json({
      success: true,
      message: `Recorded ${action}`,
      stats: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  // Reset stats
  stats = {
    totalClicks: 0,
    uniqueVisitors: 0,
    lastClickTime: null,
    popularColors: {
      blue: 0,
      red: 0,
      green: 0,
      purple: 0,
      yellow: 0,
      pink: 0,
      indigo: 0,
      teal: 0
    }
  };
  
  return NextResponse.json({
    success: true,
    message: 'Stats reset successfully',
    timestamp: new Date().toISOString()
  });
}