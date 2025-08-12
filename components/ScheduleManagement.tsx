import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Edit, Trash2, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';

export function ScheduleManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const schedules = [
    {
      id: 1,
      title: '신제품 프로모션',
      content: '2024 신제품 프로모션',
      startTime: '09:00',
      endTime: '18:00',
      devices: ['로비 디스플레이 #1', '엘리베이터 디스플레이'],
      date: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      title: '점심시간 메뉴',
      content: '매장 운영 시간 안내',
      startTime: '11:30',
      endTime: '14:00',
      devices: ['카페테리아 디스플레이'],
      date: '2024-01-15',
      status: 'active'
    },
    {
      id: 3,
      title: '긴급 공지',
      content: '긴급 공지사항',
      startTime: '08:00',
      endTime: '20:00',
      devices: ['로비 디스플레이 #1', '엘리베이터 디스플레이', '회의실 디스플레이'],
      date: '2024-01-16',
      status: 'scheduled'
    },
    {
      id: 4,
      title: '이벤트 안내',
      content: '브랜드 홍보 영상',
      startTime: '10:00',
      endTime: '17:00',
      devices: ['로비 디스플레이 #1'],
      date: '2024-01-17',
      status: 'scheduled'
    }
  ];

  const today = new Date();
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const todaySchedules = schedules.filter(schedule => schedule.date === selectedDateStr);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">진행중</Badge>;
      case 'scheduled':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">예정</Badge>;
      case 'completed':
        return <Badge variant="secondary">완료</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">취소</Badge>;
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  const hasSchedule = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return schedules.some(schedule => schedule.date === dateStr);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">스케줄 관리</h2>
          <p className="text-gray-600">콘텐츠 재생 스케줄을 관리하세요</p>
        </div>
        
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              새 스케줄 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>새 스케줄 추가</DialogTitle>
              <DialogDescription>
                콘텐츠 재생 스케줄을 설정하세요
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="schedule-title">스케줄 제목</Label>
                <Input id="schedule-title" placeholder="스케줄 제목을 입력하세요" />
              </div>
              
              <div>
                <Label htmlFor="schedule-content">콘텐츠 선택</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="콘텐츠를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promo">2024 신제품 프로모션</SelectItem>
                    <SelectItem value="hours">매장 운영 시간 안내</SelectItem>
                    <SelectItem value="survey">고객 만족도 조사</SelectItem>
                    <SelectItem value="notice">긴급 공지사항</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time">시작 시간</Label>
                  <Input id="start-time" type="time" />
                </div>
                <div>
                  <Label htmlFor="end-time">종료 시간</Label>
                  <Input id="end-time" type="time" />
                </div>
              </div>

              <div>
                <Label htmlFor="schedule-devices">대상 기기</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="기기를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lobby1">로비 디스플레이 #1</SelectItem>
                    <SelectItem value="elevator">엘리베이터 디스플레이</SelectItem>
                    <SelectItem value="meeting">회의실 디스플레이</SelectItem>
                    <SelectItem value="cafe">카페테리아 디스플레이</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setIsScheduleDialogOpen(false)}>
                  추가
                </Button>
                <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                  취소
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              스케줄 달력
            </CardTitle>
            <CardDescription>날짜를 선택하여 해당 일의 스케줄을 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasSchedule: (date) => hasSchedule(date)
              }}
              modifiersStyles={{
                hasSchedule: {
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '50%'
                }
              }}
            />
            <div className="mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span>스케줄이 있는 날</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Schedules */}
        <Card>
          <CardHeader>
            <CardTitle>{formatDate(selectedDate)}</CardTitle>
            <CardDescription>
              {todaySchedules.length > 0 
                ? `${todaySchedules.length}개의 스케줄이 있습니다`
                : '스케줄이 없습니다'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todaySchedules.length > 0 ? (
              <div className="space-y-3">
                {todaySchedules.map((schedule) => (
                  <div key={schedule.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">{schedule.title}</h4>
                      {getStatusBadge(schedule.status)}
                    </div>
                    
                    <p className="text-sm text-gray-600">{schedule.content}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{schedule.startTime} - {schedule.endTime}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Monitor className="w-4 h-4" />
                      <span>{schedule.devices.length}대 기기</span>
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>선택한 날짜에 스케줄이 없습니다.</p>
                <Button variant="outline" className="mt-2" onClick={() => setIsScheduleDialogOpen(true)}>
                  스케줄 추가
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Schedules */}
      <Card>
        <CardHeader>
          <CardTitle>다가오는 스케줄</CardTitle>
          <CardDescription>향후 일주일간의 예정된 스케줄</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {schedules.filter(schedule => new Date(schedule.date) >= today).slice(0, 5).map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-medium text-gray-900">{schedule.title}</h4>
                    {getStatusBadge(schedule.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{schedule.date}</span>
                    <span>{schedule.startTime} - {schedule.endTime}</span>
                    <span>{schedule.devices.length}대 기기</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}