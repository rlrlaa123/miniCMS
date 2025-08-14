import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter, Upload, Play, Pause, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const contents = [
    {
      id: 1,
      title: '2024 신제품 프로모션',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      duration: '00:02:30',
      size: '45.2 MB',
      status: 'active',
      createdAt: '2024-01-15',
      devices: 12
    },
    {
      id: 2,
      title: '매장 운영 시간 안내',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      duration: '정적',
      size: '2.1 MB',
      status: 'active',
      createdAt: '2024-01-10',
      devices: 8
    },
    {
      id: 3,
      title: '고객 만족도 조사',
      type: 'interactive',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      duration: '상호작용',
      size: '12.8 MB',
      status: 'draft',
      createdAt: '2024-01-08',
      devices: 0
    },
    {
      id: 4,
      title: '긴급 공지사항',
      type: 'text',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      duration: '00:00:15',
      size: '0.8 MB',
      status: 'paused',
      createdAt: '2024-01-05',
      devices: 24
    },
    {
      id: 5,
      title: '브랜드 홍보 영상',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      duration: '00:01:45',
      size: '38.5 MB',
      status: 'active',
      createdAt: '2024-01-03',
      devices: 16
    },
    {
      id: 6,
      title: '이벤트 당첨자 발표',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
      duration: '정적',
      size: '3.2 MB',
      status: 'expired',
      createdAt: '2023-12-28',
      devices: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">활성</Badge>;
      case 'paused':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">일시정지</Badge>;
      case 'draft':
        return <Badge variant="secondary">초안</Badge>;
      case 'expired':
        return <Badge variant="destructive">만료</Badge>;
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎬';
      case 'image':
        return '🖼️';
      case 'interactive':
        return '🎮';
      case 'text':
        return '📝';
      default:
        return '📄';
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || content.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">콘텐츠 관리</h2>
          <p className="text-gray-600">디스플레이용 콘텐츠를 업로드하고 관리하세요</p>
        </div>
        
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              콘텐츠 업로드
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>새 콘텐츠 업로드</DialogTitle>
              <DialogDescription>
                디스플레이에서 재생할 콘텐츠를 업로드하세요
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="content-title">콘텐츠 제목</Label>
                <Input id="content-title" placeholder="콘텐츠 제목을 입력하세요" />
              </div>
              
              <div>
                <Label htmlFor="content-type">콘텐츠 유형</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="유형을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">동영상</SelectItem>
                    <SelectItem value="image">이미지</SelectItem>
                    <SelectItem value="interactive">인터랙티브</SelectItem>
                    <SelectItem value="text">텍스트</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">파일을 드래그하거나 클릭하여 업로드</p>
                <Button variant="outline" className="mt-2">파일 선택</Button>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setIsUploadOpen(false)}>
                  업로드
                </Button>
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
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
            placeholder="콘텐츠 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 유형</SelectItem>
            <SelectItem value="video">동영상</SelectItem>
            <SelectItem value="image">이미지</SelectItem>
            <SelectItem value="interactive">인터랙티브</SelectItem>
            <SelectItem value="text">텍스트</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContents.map((content) => (
          <Card key={content.id} className="overflow-hidden">
            <div className="relative">
              <ImageWithFallback
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="text-xs">
                  {getTypeIcon(content.type)} {content.type}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                {getStatusBadge(content.status)}
              </div>
              {content.type === 'video' && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {content.duration}
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{content.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>크기:</span>
                  <span>{content.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>생성일:</span>
                  <span>{content.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span>배포 기기:</span>
                  <span>{content.devices}대</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  미리보기
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  {content.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">검색 조건에 맞는 콘텐츠가 없습니다.</p>
        </div>
      )}
    </div>
  );
}