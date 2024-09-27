import React, { useState, useEffect } from 'react';
import { Box, Card, Avatar, Typography, Button } from '@mui/material';
import PostCard from './PostCard'; // PostCard 컴포넌트 가져오기

// StoryList 컴포넌트
function StoryList() {
  const stories = ['s_won', 'vviva', 'delicion', 'korean', 'apt', 'sangsi', '__two'];

  return (
    <Box
      display="flex"
      justifyContent="left"
      p={2}
      overflow="auto"
      sx={{
        backgroundColor: 'white',
        borderRadius: '0px',
        border: '1px solid #e0e0e0',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      {stories.map((story) => (
        <Box key={story} mx={1} textAlign="center">
          <Avatar sx={{ bgcolor: '#b39ddb' }}>{story[0]?.toUpperCase() || ''}</Avatar> {/* toUpperCase 전에 체크 */}
          <Typography variant="caption">{story}</Typography>
        </Box>
      ))}
    </Box>
  );
}

// SuggestedUser 컴포넌트
function SuggestedUser({ userName, description }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderBottom="1px solid #e0e0e0">
      <Box display="flex" alignItems="center">
        <Avatar>{userName[0]?.toUpperCase() || ''}</Avatar> {/* toUpperCase 전에 체크 */}
        <Box ml={2}>
          <Typography fontWeight="bold">{userName}</Typography>
          <Typography variant="body2" color="textSecondary">{description}</Typography>
        </Box>
      </Box>
      <Button variant="text" color="primary">팔로우</Button>
    </Box>
  );
}
// Main Contents 컴포넌트
export default function Contents({ refresh }) {
  const [feeds, setFeeds] = useState([]); // 피드 데이터를 저장할 상태
  const [loggedInUserName, setLoggedInUserName] = useState(''); // 로그인한 사용자 이름 상태
  const [profileImageSrc, setProfileImageSrc] = useState(null); // 프로필 이미지 상태 추가
  const userId = Number(localStorage.getItem('userId')); // 로컬 스토리지에서 사용자 ID 가져오기

  // 백엔드에서 피드 데이터를 가져옴
  const fetchFeeds = () => {
    fetch('http://localhost:3001/getfeed') // 피드 데이터를 가져오는 API 호출
      .then((response) => response.json())
      .then((data) => {
        const convertedFeeds = data.map((feed) => ({
          ...feed,
          fileBlob: new Blob([new Uint8Array(feed.feedview.data)], { type: 'image/jpeg' }), // BLOB 데이터를 파일로 변환
        }));
        setFeeds(convertedFeeds); // 피드 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error('피드 데이터를 가져오는 중 오류 발생:', error);
      });
  };

    // 로그인한 사용자의 프로필 이미지를 가져오는 함수
  const fetchProfileImage = () => {
    fetch(`http://localhost:3001/getprofile?propilid=${userId}`)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setProfileImageSrc(reader.result); // 프로필 이미지를 상태에 저장
        };
      })
      .catch((error) => {
        console.error('프로필 이미지를 가져오는 중 오류 발생:', error);
      });
  };

  // 컴포넌트가 마운트될 때 피드 데이터를 처음 가져옴
  useEffect(() => {
    fetchFeeds();
    const userName = localStorage.getItem('name'); // 로컬 스토리지에서 사용자 이름 가져오기
    if (userName) {
      setLoggedInUserName(userName); // 로그인한 사용자 이름을 상태로 설정
    }
  }, []);

  // refresh 상태가 변경될 때 피드를 새로 불러옴
  useEffect(() => {
    fetchFeeds();
  }, [refresh]);

  useEffect(() => {
    if (userId) {
      fetchProfileImage(); // 로그인한 사용자 프로필 이미지 가져오기
    }
  }, [userId]);

  return (
    <Box p={2} maxWidth={1200} margin="0 auto">
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
        {/* 왼쪽 컬럼: 피드 */}
        <Box flex={2}>
          <Box flex={2}>
            <Box mb={2}>
              <StoryList /> {/* 스토리 카드 렌더링 */}
            </Box>
            {/* 가져온 피드 데이터를 렌더링 */}
            {feeds.map((feed) => (
              <PostCard
                key={feed.id}
                feedid={feed.feedid}
                userName={feed.userName} // 각 피드 작성자의 이름
                fileBlob={feed.fileBlob} // Blob으로 변환된 이미지 파일
                likesCount={feed.feedgood} // 좋아요 수
                feedword={feed.feedword} // 피드 내용
              />
            ))}
          </Box>
        </Box>

        {/* 오른쪽 컬럼: 로그인한 사용자 프로필 */}
        <Box flex={1}>
          <Card style={{ padding: '16px' }}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ width: 56, height: 56 }} src={profileImageSrc || ''}>
                {loggedInUserName ? loggedInUserName[0].toUpperCase() : 'U'}
              </Avatar> {/* 프로필 사진이 없을 때는 이름의 첫 글자 표시 */}
              <Box ml={2}>
                <Typography fontWeight="bold">{loggedInUserName}</Typography>
              </Box>
            </Box>
            <Box my={2}>
              <Typography variant="subtitle1" color="textSecondary">
                회원님을 위한 추천
              </Typography>
              <Button variant="text" color="primary">모두 보기</Button>
            </Box>
            <SuggestedUser userName="samsung" description="hyundai님 외 4명이 팔로우합니다." />
          </Card>
        </Box>
      </Box>
    </Box>
  );
}