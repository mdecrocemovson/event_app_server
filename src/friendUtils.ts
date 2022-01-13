export const getFriendsFromUser = (user) => {
  return user?.friendships?.map((friendship) => {
    const { friends } = friendship;
    return [friends[0].id, friends[1].id];
  });
};

export const calculateMutualFriends = (activeUser, friend) => {
  const totalFriendsActiveUser = getFriendsFromUser(activeUser);

  const totalFriendsFriend = getFriendsFromUser(friend);

  if (totalFriendsActiveUser.length === 0 || totalFriendsFriend.length === 0) {
    return 0;
  }

  // accounting for no friendships?
  // accounting for no friendships?

  const allFriends = totalFriendsActiveUser
    .flat()
    .concat(...totalFriendsFriend);

  let allFriendsMap = {};

  for (let friend of allFriends) {
    if (allFriendsMap[friend]) {
      allFriendsMap[friend]++;
    } else {
      allFriendsMap[friend] = 1;
    }
  }

  let mutualFriendsCounter = 0;

  for (let entry in allFriendsMap) {
    if (allFriendsMap[entry] > 1) mutualFriendsCounter++;
  }

  return mutualFriendsCounter;
};
