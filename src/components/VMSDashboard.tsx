import { Video, Play, Pause, RotateCcw, Maximize, MapPin, AlertCircle } from "lucide-react";
import { StatCard } from "./StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const alertData = [
  { time: "00:00", alerts: 4 },
  { time: "04:00", alerts: 2 },
  { time: "08:00", alerts: 8 },
  { time: "12:00", alerts: 12 },
  { time: "16:00", alerts: 15 },
  { time: "20:00", alerts: 9 },
];

const cameras = [
  { id: "CAM-001", location: "Main Entrance", status: "online", recording: true, alerts: 0 },
  { id: "CAM-002", location: "Parking Lot A", status: "online", recording: true, alerts: 2 },
  { id: "CAM-003", location: "Lobby", status: "offline", recording: false, alerts: 0 },
  { id: "CAM-004", location: "Emergency Exit", status: "online", recording: true, alerts: 1 },
  { id: "CAM-005", location: "Server Room", status: "online", recording: true, alerts: 0 },
];

export function VMSDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Video Management System</h2>
        <p className="text-muted-foreground">Monitor and control security cameras across all locations</p>
      </div>

      {/* VMS Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Cameras"
          value="248"
          change="+3 new cameras"
          changeType="positive"
          icon={Video}
        />
        <StatCard
          title="Online Cameras"
          value="242"
          change="97.6% uptime"
          changeType="positive"
          icon={Video}
        />
        <StatCard
          title="Recording"
          value="238"
          change="Active recording"
          changeType="neutral"
          icon={Video}
        />
        <StatCard
          title="Alerts Today"
          value="47"
          change="+12 from yesterday"
          changeType="negative"
          icon={AlertCircle}
        />
      </div>

      {/* Live View Grid */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Live Camera Feeds</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Maximize className="w-4 h-4 mr-2" />
              Full Screen
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="relative bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                <div className="absolute top-2 left-2 z-10">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    CAM-{String(i + 1).padStart(3, '0')}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 z-10">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-center text-white/70">
                  <Video className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Camera Feed {i + 1}</p>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center z-10">
                  <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                    Main Entrance
                  </span>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-white hover:bg-white/20">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-white hover:bg-white/20">
                      <Pause className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Timeline (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={alertData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alerts" fill="#38a3a5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Camera Management */}
        <Card>
          <CardHeader>
            <CardTitle>Camera Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Camera</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Alerts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cameras.map((camera) => (
                  <TableRow key={camera.id}>
                    <TableCell className="font-medium">{camera.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{camera.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={camera.status === 'online' ? 'default' : 'destructive'}>
                        {camera.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {camera.alerts > 0 ? (
                        <Badge variant="destructive">{camera.alerts}</Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}