const db = require('./connection'); // MariaDB 연결 설정 가져오기

// 사용자를 삽입하는 함수
const insertUser = (name, logid, password, callback) => {
  const query = 'INSERT INTO Log (name, logid, password) VALUES (?, ?, ?)';
  db.query(query, [name, logid, password], (err, result) => {
    if (err) {
      console.error('사용자 삽입 중 오류 발생:', err);
      return callback(err, null);
    }
    return callback(null, result);  // 성공적으로 처리되면 결과 반환
  });
};

// 사용자를 아이디로 조회하는 함수
const getUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM Log WHERE logid = ?'; // logid 필드를 기준으로 사용자 조회
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('사용자 조회 중 오류 발생:', err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null); // 사용자가 없으면 null 반환
    }
    return callback(null, results[0]); // 첫 번째 사용자 정보 반환
  });
};

// 피드를 삽입하는 함수
const insertFeed = (feedid, feedview, feedword, feedgood, callback) => {
  const query = 'INSERT INTO Feed (feedid, feedview, feedword, feedgood) VALUES (?, ?, ?, ?)';
  db.query(query, [feedid, feedview, feedword, feedgood], (err, result) => {
    if (err) {
      console.error('피드 삽입 중 오류 발생:', err);
      return callback(err, null);
    }
    return callback(null, result);  // 성공적으로 처리되면 결과 반환
  });
};

//프로필 삽입 또는 업데이트 함수
const updateProfilePicture = (propilid, profileImage, callback) => {
  // 먼저 해당 propilid가 존재하는지 확인하는 쿼리
  const checkQuery = 'SELECT * FROM Propile WHERE propilid = ?';

  db.query(checkQuery, [propilid], (err, results) => {
    if (err) {
      console.error('프로필 확인 중 오류 발생:', err);
      return callback(err, null);
    }

    if (results.length > 0) {
      // 프로필이 이미 존재하면 UPDATE
      const updateQuery = 'UPDATE Propile SET propileview = ? WHERE propilid = ?';
      db.query(updateQuery, [profileImage, propilid], (err, result) => {
        if (err) {
          console.error('프로필 업데이트 중 오류 발생:', err);
          return callback(err, null);
        }
        return callback(null, result); // 성공적으로 업데이트되면 결과 반환
      });
    } else {
      // 프로필이 없으면 INSERT
      const insertQuery = 'INSERT INTO Propile (propilid, propileview) VALUES (?, ?)';
      db.query(insertQuery, [propilid, profileImage], (err, result) => {
        if (err) {
          console.error('프로필 삽입 중 오류 발생:', err);
          return callback(err, null);
        }
        console.log('프로필 삽입 성공:', result);
        return callback(null, result); // 성공적으로 삽입되면 콜백 호출
      });
    }
  });
};

// 스토리 추가 함수
const addStory = (storyId, storyBuffer, callback) => {
  const query = 'INSERT INTO Story (Storyid, storyview) VALUES (?, ?)';
  db.query(query, [storyId, storyBuffer], (err, result) => {
    if (err) {
      console.error('스토리 추가 중 오류 발생:', err);
      return callback(err); // 콜백 함수로 오류를 반환
    }
    return callback(null, result); // 성공적으로 추가되면 콜백에 결과 반환
  });
};

// 함수 모두 내보내기
module.exports = {
  insertUser,
  getUserByUsername,
  insertFeed,
  updateProfilePicture,
  addStory,
};
