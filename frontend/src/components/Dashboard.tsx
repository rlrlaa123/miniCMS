import React from 'react';
import { Monitor, AlertCircle, Video, Wifi, WifiOff, Battery, Thermometer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function Dashboard() {
  const stats = [
    {
      title: '온라인 기기',
      value: '24',
      total: '28',
      icon: Monitor,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: '활성 알림',
      value: '3',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: '예정 콘텐츠',
      value: '12',
      icon: Video,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  const devices = [
    {
      id: 1,
      name: '로비 디스플레이 #1',
      location: '1층 로비',
      status: 'online',
      lastSeen: '방금 전',
      temperature: 42,
      storage: 75
    },
    {
      id: 2,
      name: '엘리베이터 디스플레이',
      location: '엘리베이터 홀',
      status: 'online',
      lastSeen: '1분 전',
      temperature: 38,
      storage: 60
    },
    {
      id: 3,
      name: '회의실 디스플레이',
      location: '3층 회의실',
      status: 'offline',
      lastSeen: '2시간 전',
      temperature: null,
      storage: null
    },
    {
      id: 4,
      name: '카페테리아 디스플레이',
      location: '지하 1층',
      status: 'warning',
      lastSeen: '5분 전',
      temperature: 55,
      storage: 90
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: '카페테리아 디스플레이 온도 상승',
      time: '5분 전'
    },
    {
      id: 2,
      type: 'error',
      message: '회의실 디스플레이 연결 끊김',
      time: '2시간 전'
    },
    {
      id: 3,
      type: 'info',
      message: '새로운 콘텐츠 배포 완료',
      time: '1시간 전'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-4 h-4 text-green-600" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Wifi className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge variant="default" className="bg-green-100 text-green-800">온라인</Badge>;
      case 'offline':
        return <Badge variant="destructive">오프라인</Badge>;
      case 'warning':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">경고</Badge>;
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">대시보드</h2>
        <p className="text-gray-600">디지털 사이니지 네트워크 현황을 한눈에 확인하세요</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                      {stat.total && <span className="text-sm text-gray-500">/{stat.total}</span>}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status */}
        <Card>
          <CardHeader>
            <CardTitle>기기 상태</CardTitle>
            <CardDescription>등록된 디스플레이 기기 현황</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(device.status)}
                    <div>
                      <p className="font-medium text-gray-900">{device.name}</p>
                      <p className="text-sm text-gray-500">{device.location}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    {getStatusBadge(device.status)}
                    <p className="text-xs text-gray-500">{device.lastSeen}</p>
                    {device.temperature && (
                      <div className="flex items-center space-x-1 text-xs">
                        <Thermometer className="w-3 h-3" />
                        <span>{device.temperature}°C</span>
                      </div>
                    )}
                    {device.storage && (
                      <div className="w-16">
                        <Progress value={device.storage} className="h-1" />
                        <span className="text-xs text-gray-500">{device.storage}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>최근 알림</CardTitle>
            <CardDescription>시스템 알림 및 이벤트</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'error' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}