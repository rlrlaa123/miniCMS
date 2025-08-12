import React, { useState } from 'react';
import { 
  Monitor, Search, Filter, Power, RotateCcw, Settings, Wifi, WifiOff, 
  AlertCircle, Battery, Thermometer, HardDrive, Plus, MapPin 
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';

export function DeviceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  const devices = [
    {
      id: 1,
      name: '로비 디스플레이 #1',
      location: '1층 로비',
      group: '공용구역',
      status: 'online',
      lastSeen: '방금 전',
      ip: '192.168.1.101',
      model: 'Display 55UH5F-H',
      temperature: 42,
      storage: { used: 75, total: 100 },
      uptime: '15일 3시간',
      currentContent: '2024 신제품 프로모션'
    },
    {
      id: 2,
      name: '엘리베이터 디스플레이',
      location: '엘리베이터 홀',
      group: '교통구역',
      status: 'online',
      lastSeen: '1분 전',
      ip: '192.168.1.102',
      model: 'Display 43UH5F-H',
      temperature: 38,
      storage: { used: 60, total: 100 },
      uptime: '22일 8시간',
      currentContent: '매장 운영 시간 안내'
    },
    {
      id: 3,
      name: '회의실 디스플레이',
      location: '3층 회의실',
      group: '회의실',
      status: 'offline',
      lastSeen: '2시간 전',
      ip: '192.168.1.103',
      model: 'Display 65UH5F-H',
      temperature: null,
      storage: { used: 45, total: 100 },
      uptime: '0분',
      currentContent: null
    },
    {
      id: 4,
      name: '카페테리아 디스플레이',
      location: '지하 1층',
      group: '편의시설',
      status: 'warning',
      lastSeen: '5분 전',
      ip: '192.168.1.104',
      model: 'Display 49UH5F-H',
      temperature: 58,
      storage: { used: 92, total: 100 },
      uptime: '8일 12시간',
      currentContent: '점심시간 메뉴'
    },
    {
      id: 5,
      name: '입구 디스플레이',
      location: '정문 입구',
      group: '공용구역',
      status: 'online',
      lastSeen: '방금 전',
      ip: '192.168.1.105',
      model: 'Display 55UH5F-H',
      temperature: 40,
      storage: { used: 30, total: 100 },
      uptime: '30일 5시간',
      currentContent: '환영 메시지'
    },
    {
      id: 6,
      name: '대기실 디스플레이',
      location: '2층 대기실',
      group: '고객구역',
      status: 'maintenance',
      lastSeen: '1일 전',
      ip: '192.168.1.106',
      model: 'Display 43UH5F-H',
      temperature: null,
      storage: { used: 0, total: 100 },
      uptime: '0분',
      currentContent: null
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
      case 'maintenance':
        return <Settings className="w-4 h-4 text-blue-600" />;
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
      case 'maintenance':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">점검중</Badge>;
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectDevice = (deviceId: number) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId) 
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDevices.length === filteredDevices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(filteredDevices.map(device => device.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">기기 관리</h2>
          <p className="text-gray-600">등록된 디스플레이 기기를 모니터링하고 제어하세요</p>
        </div>
        
        <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              기기 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>새 기기 추가</DialogTitle>
              <DialogDescription>
                새로운 디스플레이 기기를 등록하세요
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="device-name">기기 이름</Label>
                <Input id="device-name" placeholder="기기 이름을 입력하세요" />
              </div>
              
              <div>
                <Label htmlFor="device-location">설치 위치</Label>
                <Input id="device-location" placeholder="설치 위치를 입력하세요" />
              </div>

              <div>
                <Label htmlFor="device-ip">IP 주소</Label>
                <Input id="device-ip" placeholder="192.168.1.xxx" />
              </div>

              <div>
                <Label htmlFor="device-group">기기 그룹</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="그룹을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">공용구역</SelectItem>
                    <SelectItem value="traffic">교통구역</SelectItem>
                    <SelectItem value="meeting">회의실</SelectItem>
                    <SelectItem value="facility">편의시설</SelectItem>
                    <SelectItem value="customer">고객구역</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setIsAddDeviceOpen(false)}>
                  추가
                </Button>
                <Button variant="outline" onClick={() => setIsAddDeviceOpen(false)}>
                  취소
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="기기명 또는 위치 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 상태</SelectItem>
            <SelectItem value="online">온라인</SelectItem>
            <SelectItem value="offline">오프라인</SelectItem>
            <SelectItem value="warning">경고</SelectItem>
            <SelectItem value="maintenance">점검중</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedDevices.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedDevices.length}개 기기 선택됨
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Power className="w-4 h-4 mr-1" />
                  전원 끄기
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  재부팅
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  설정
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Device Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <Card key={device.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={selectedDevices.includes(device.id)}
                    onCheckedChange={() => handleSelectDevice(device.id)}
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{device.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {device.location}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(device.status)}
                  {getStatusBadge(device.status)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Device Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">그룹:</span>
                  <p className="font-medium">{device.group}</p>
                </div>
                <div>
                  <span className="text-gray-500">모델:</span>
                  <p className="font-medium">{device.model}</p>
                </div>
                <div>
                  <span className="text-gray-500">IP:</span>
                  <p className="font-medium">{device.ip}</p>
                </div>
                <div>
                  <span className="text-gray-500">업타임:</span>
                  <p className="font-medium">{device.uptime}</p>
                </div>
              </div>

              {/* System Status */}
              {device.status !== 'offline' && device.status !== 'maintenance' && (
                <div className="space-y-3">
                  {device.temperature && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">온도</span>
                      </div>
                      <span className={`text-sm font-medium ${
                        device.temperature > 50 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {device.temperature}°C
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">저장공간</span>
                      </div>
                      <span className="text-sm font-medium">{device.storage.used}%</span>
                    </div>
                    <Progress value={device.storage.used} className="h-2" />
                  </div>
                </div>
              )}

              {/* Current Content */}
              {device.currentContent && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">현재 재생 중</p>
                  <p className="text-sm font-medium">{device.currentContent}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={device.status === 'offline' || device.status === 'maintenance'}
                >
                  <Power className="w-4 h-4 mr-1" />
                  전원
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={device.status === 'offline' || device.status === 'maintenance'}
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  재부팅
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                마지막 접속: {device.lastSeen}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Select All Checkbox */}
      {filteredDevices.length > 0 && (
        <div className="flex items-center justify-center pt-4">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <Checkbox
              checked={selectedDevices.length === filteredDevices.length}
              onCheckedChange={handleSelectAll}
            />
            모든 기기 선택
          </label>
        </div>
      )}

      {filteredDevices.length === 0 && (
        <div className="text-center py-8">
          <Monitor className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">검색 조건에 맞는 기기가 없습니다.</p>
        </div>
      )}
    </div>
  );
}