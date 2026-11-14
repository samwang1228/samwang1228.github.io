---
title: leetcode 75 Level 1
date: 2022-07-17 18:00:00
subtitle: '提供source code跟解題思路'
tags:
    - LeetCode
---

> 最近改刷常考的面試題leetcode 75，歡迎一起討論留言告訴我你的思路:)
>

![1](75.jpg)

* Day 1 Greedy
  * [724. Find Pivot Index](#jump724)
* Day 2 String(待補)
  * [205. Isomorphic Strings](#jump205)
  * [392. Is Subsequence](#jump392)
* Day 3 Linked List(待補)
  * [21. Merge Two Sorted Lists](#jump21)
  * [206. Reverse Linked List](#jump206)
* Day 4 Linked List
  * [876. Middle of the Linked List](#jump876)(待補)
  * [142. Linked List Cycle II](#jump142)
* Day 5 Greedy(待補)
  * [121. Best Time to Buy and Sell Stock](#jump121)
  * [409. Longest Palindrome](#jump409)
* Day 6 Tree
  * [589. N-ary Tree Preorder Traversal](#jump589)
  * [102. Binary Tree Level Order Traversal](#jump102)
* Day 7 Binary Search
  * [278. First Bad Version](#jump278)
* Day 8 Binary Search Tree
  * [98. Validate Binary Search Tree](#jump98)
* Day 9 Graph/BFS/DFS
  * [733. Flood Fill](#jump733)
  * [200. Number of Islands](#jump200)
* Day 10 Dynamic Programming
  * [509. Fibonacci Number](#jump509)(待補)
  * [70. Climbing Stairs](#jump70)
* Day 11 Dynamic Programming
  * [746. Min Cost Climbing](#jump746)
  * [62. Unique Paths](#jump62)(待補)
* Day 12 Sliding Window/Two Pointer
  * [438. Find All Anagrams in a String](#jump438)
  * [424. Longest Repeating Character Replacement](#jump424)
* Day 13 Hashmap
  * [1. Two Sum](#jump1)
  * [299. Bulls and Cows](#jump299)(待補)
* Day 14 Stack(待補)
  * [844. Backspace String Compare](#jump844)
  * [394. Decode String](#jump394)
* Day 15 Heap
  * [1046. Last Stone Weight](#jump1046)
  * [692. Top K Frequent Words](#jump692)(待補)

# <span id="jump724">724. Find Pivot Index</span>

### 題目:

當左邊和等於右邊和(皆不包含樞紐)return 樞紐位置，若有n個value可以同時達成pivot要選最左邊那個,若沒有樞紐return -1

### 連結:

<a>[https://leetcode.com/problems/find-pivot-index/](https://leetcode.com/problems/find-pivot-index/) </a>

### 範例:

Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11

Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.

### 解題思路:

先算出array的總和，再從index=0的位置減去nums elemebt，以及設一個第二個和來比對來個是否相等。

```c++
#include<iostream>
#include<cstring>
#include<vector>
using namespace std;
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int res=0,total=0;
        for(int i=0;i<nums.size();i++)
        {
            total+=nums[i];
        }
        for(int i=0;i<nums.size();i++)
        {
            
            total-=nums[i];
            if(res==total)
                return i;
            res+=nums[i];
        }
        return -1;
    }
};
```

# <span id="jump142">142. Linked List Cycle II</span>

### 題目:

要回傳環狀linked list的起始點若沒有環則回傳NULL

### 連結:

<a>[https://leetcode.com/problems/linked-list-cycle-ii/](https://leetcode.com/problems/linked-list-cycle-ii/) </a>

### 範例:

Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.
Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.

### 解題思路:

是否有環用一個快指針跟慢指針去比較如果一樣代表有環，想像一下跑操場，我倒追你一圈
怎麼找到起點呢?

```c++
#include<iostream>
#include<string>
#include <sstream>
#include<vector>
#include<queue>
using namespace std;
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *fast=head;
        ListNode *slow=head;
        if(!fast ||!fast->next )
            return NULL;
        while(fast && fast->next)
        {
            slow=slow->next;
            fast=fast->next->next;
            if(slow==fast)
                break;
        }
        if(!fast || !fast->next)
            return NULL;
        fast=head;
        while(fast!=slow)
        {
            fast=fast->next;
            slow=slow->next;
        }
        return slow;
    }
}; 
```

# <span id="jump589">589. N-ary Tree Preorder Traversal</span>

### 題目:

有一個n-ary tree要以preorder的方式尋訪，也就是先從root開始輸出，並要一直往左走，走到底返回上一層在換右邊
(點開下方連結看圖比較好懂)

### 連結:

<a>[https://leetcode.com/problems/n-ary-tree-preorder-traversal/](https://leetcode.com/problems/n-ary-tree-preorder-traversal/) </a>

### 範例:

Input: root = [1,null,3,2,4,null,5,6]
Output: [1,3,5,6,2,4]

[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]

### 解題思路:

首先要了解架構，每一個node都包含了自己的所有下一層小孩，而每個小孩又包含了自己下一層的所有小孩取值->val 往小孩走->child[i] 以第一個input舉例:1->children[0]=3 1->children[1]=2，當然可以直接用:的方式遍瀝
遞迴:
只要用一個for讓root一直往下看小孩即可1->3->5->NULL return上一層3，因上一次遞迴以跑過，因此此時的3的child=[1]->val為6了以此類推達成。

<font color=#FF0000>Recursive solution is trivial, could you do it iteratively?</font>

```c++
class Solution {
public:
    vector<int> preorder(Node* root) {
        vector<int> res;
        traversal(root,res);
        return res;
    }
    void traversal(Node * root,vector<int>&res)
    {
        if(!root) return;
        res.push_back(root->val);
        cout<<root->val;
        for(Node * child:root->children)
            traversal(child,res);
    }
};
```

# <span id="jump102">102. Binary Tree Level Order Traversal</span>

### 題目:

Given the root of a binary tree, return the level order traversal of its nodes’
// values. (i.e., from left to right, level by level).

### 連結:

<a>[https://leetcode.com/problems/binary-tree-level-order-traversal/](https://leetcode.com/problems/binary-tree-level-order-traversal/)</a>

### 範例:

Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
Input: root = [1]
Output: [[1]]

### 解題思路:

//待補

```c++
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        queue<TreeNode *> q;
        vector<vector<int>> res;
        if(!root)
            return res;
        q.push(root);
        while(!q.empty())
        {
            int size=q.size();
            cout<<size<<endl;
            vector<int> level;
            for(int i=0;i<size;i++)
            {
                TreeNode* cur=q.front();
                q.pop();
                level.push_back(cur->val);
                if(cur->left)
                    q.push(cur->left);
                if(cur->right)
                    q.push(cur->right);
            }
            res.push_back(level);
        }
        return res;
    }
};
```

# <span id="jump278">278. First Bad Version</span>

### 題目:

給定一個size且提供一個已寫好的函示isBadVersion(index)，此函數可以判斷這個位置是好的還是壞的，若是壞的isBadVersion()會return true反之return false，今天我們要找出第一個壞的位置，因為一旦第i個壞掉，i+1~size的地方都會是壞的(return true)。

### 連結:

<a>[https://leetcode.com/problems/first-bad-version/](https://leetcode.com/problems/first-bad-version/) </a>

### 範例:

Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.

Input: n = 1, bad = 1
Output: 1

### 解題思路:

使用binary search，只是這次要找的解為上一個false下一個為ture的位置，而當遇到true代表右邊要往中間縮(為了找到第一個true)反之遇到false左邊要往中間靠(為了找到最後一個false)。
*** 請使用mid=left+(right-left)/2; offset的概念，而非mid=(right+left)/2因為可能會超過int的範圍，且使用long long效率會變差 ***

```c++
class Solution {
public:
    int firstBadVersion(int n) {
        int right=n,left=0,mid;
        while(left<=right)
        {
        mid=left+(right-left)/2;
        if(isBadVersion(mid+1)&&!isBadVersion(mid))
            return mid+1;
        if(isBadVersion(mid))
            right=mid-1;
        else 
            left=mid+1;
        }
        return left;
    }
};
```

# <span id="jump98">98. Validate Binary Search Tree</span>

### 題目:

左子樹要小於爸爸，右子樹要大於爸爸，且左子樹和柚子數的小孩也就是爸爸的孫子一樣要滿足此情況。
(點開連結看圖比較好懂)

### 連結:

<a>[https://leetcode.com/problems/validate-binary-search-tree/](https://leetcode.com/problems/validate-binary-search-tree/) </a>

### 範例:

Input: root = [2,1,3]
Output: true

Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node’s value is 5 but its right child’s value is 4.

### 解題思路:

解法1:
分成兩個recursive，一個一直往左判斷，一個一直往右判斷，且每次判斷兩個條件都要成立(左邊小右邊大)，所以走左邊的最大值放預設，走右邊的最小值放預設這樣用不到的另一個一定能滿足。
**註:LLONG_MAX為long type下的最大值，LLONG_MIN為long type下的最小值**

```c++
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return isCheck(root,LLONG_MAX,LLONG_MIN);
    }
    bool isCheck(TreeNode *root,long max,long min)
    {
        if(!root)
            return true;
        if(root->val>=max ||root->val<=min)
            return false;
        return isCheck(root->left,root->val,min) &&isCheck(root->right,max,root->val);
    }
};
```

解法2:
只用中序尋訪(inorder)，BST在Inorder的情況下是sorting的

# <span id="jump733">733. Flood Fill</span>

### 題目:

給定一個二維陣列把他想成照片，裡面的值可以當作是對應的pixel值，今天給定一個要換的新顏色以及一個固定點
要從此固定點上下左右遍瀝搜尋，若此搜尋的點之顏色跟固定點之顏色不同則停止搜尋，反之將此顏色換成新顏色。

### 連結:

<a>[https://leetcode.com/problems/flood-fill/](https://leetcode.com/problems/flood-fill/) </a>

### 範例:

Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.

Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
Explanation: The starting pixel is already colored 0, so no changes are made to the image.

### 解題思路:

解法1(DFS):
用四個遞迴依序尋訪四個位置，若row、col超出範圍則結束遞迴，又或者當前color不等於指定點也是。
*** 若搞不清楚col、rol 用cout<<”r “<<rowsize<<”c “<<colsize;判斷 ***

```c++
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        if(image[sr][sc]==color)
            return image;
        int rowsize=image.size();
        int colsize=image[0].size();
        dfs(image,sr,sc,image[sr][sc],color,colsize,rowsize);
        return image;
    }
    void dfs(vector<vector<int>>&res,int row,int col,int oldColor,int newColor,int cs,int rs)
    {
        if(row<0||col<0||row>=rs||col>=cs)
            return;
        if(res[row][col]!=oldColor)
            return;
        res[row][col]=newColor;
        dfs(res,row-1,col,oldColor,newColor,cs,rs);
        dfs(res,row,col-1,oldColor,newColor,cs,rs);
        dfs(res,row+1,col,oldColor,newColor,cs,rs);
        dfs(res,row,col+1,oldColor,newColor,cs,rs);
    }
};
```

解法2(BFS):
用四個queue來將上下左右位置存入，切換條件跟遞迴一樣
*** 若第一次用pair記住push時要{var1,var2} ***

```c++
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        if(image[sr][sc]==color)
            return image;
        int rowsize=image.size();
        int colsize=image[0].size();
        bfs(image,sr,sc,image[sr][sc],color,colsize,rowsize);
        return image;
    }
    void bfs(vector<vector<int>>&res,int row,int col,int oldColor,int newColor,int cs,int rs)
    {
        queue<pair<int,int>> q;
        q.push({row,col});
        while(!q.empty())
        {
            const auto [R,C]=q.front();
            q.pop();
            if(R<0||C<0||R>=rs||C>=cs)
                continue;
            if(res[R][C]!=oldColor)
                continue;
            res[R][C]=newColor;
            q.push({R-1,C});
            q.push({R,C-1});
            q.push({R+1,C});
            q.push({R,C+1});
        }
        
    }
};
```

# <span id="jump200">200. Number of Islands</span>

### 題目:

給定一個二維陣列，這個陣列由0、1組成1為島嶼、0為水，若島嶼四周皆為水代表一個島嶼
今天我們要回傳總共有幾個島。

### 連結:

<a>[https://leetcode.com/problems/number-of-islands/](https://leetcode.com/problems/number-of-islands/) </a>

### 範例:

Input: grid = [
  [“1”,”1”,”1”,”1”,”0”],
  [“1”,”1”,”0”,”1”,”0”],
  [“1”,”1”,”0”,”0”,”0”],
  [“0”,”0”,”0”,”0”,”0”]
]
Output: 1

Input: grid = [
  [“1”,”1”,”0”,”0”,”0”],
  [“1”,”1”,”0”,”0”,”0”],
  [“0”,”0”,”1”,”0”,”0”],
  [“0”,”0”,”0”,”1”,”1”]
]
Output: 3.

### 解題思路:

解法1(DFS):
跟733一樣用四個遞迴依序尋訪四個位置，並且將尋訪過的1改為0依序擴散，這樣就能知道區分島的範圍
因為最後每個獨立島嶼會被縮小成1個1而已，因此將array元素-‘0’就能知道有幾座島。
*** 若搞不清楚col、rol 用cout<<”r “<<rowsize<<”c “<<colsize;判斷 ***

```c++
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
    rs=grid.size();
    cs=grid[0].size();
    int counter=0;
    for(int i=0;i<rs;i++)
    {
        for(int j=0;j<cs;j++)
        {
            counter+=grid[i][j]-'0';
            dfs(grid,i,j);
        }
    }
        return counter;
    }
    void dfs(vector<vector<char>>&res,int row,int col)
    {
        if(row<0||col<0||row>=rs||col>=cs||res[row][col]=='0')
            return;
        res[row][col]='0';
        dfs(res,row-1,col);
        dfs(res,row,col-1);
        dfs(res,row+1,col);
        dfs(res,row,col+1);
    }
private:
    int rs=0;
    int cs=0;
};
```

解法2(BFS):
用四個queue來將上下左右位置存入，切換條件跟遞迴一樣
*** 若第一次用pair記住push時要{var1,var2} ***

```c++
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
    rs=grid.size();
    cs=grid[0].size();
    int counter=0;
    for(int i=0;i<rs;i++)
    {
        for(int j=0;j<cs;j++)
        {
            counter+=grid[i][j]-'0';
            bfs(grid,i,j);
        }
    }
        return counter;
    }
    void bfs(vector<vector<char>>&res,int row,int col)
    {
        queue<pair<int,int>> q;
        q.push({row,col});
        while(!q.empty())
        {
            const auto [R,C]=q.front();
            q.pop();
            if(R<0||C<0||R>=rs||C>=cs||res[R][C]=='0')
                continue;
            res[R][C]='0';
            q.push({R-1,C});
            q.push({R,C-1});
            q.push({R+1,C});
            q.push({R,C+1});
            
        }
    }
private:
    int rs=0;
    int cs=0;
};
```

# <span id="jump70">70. Climbing Stairs</span>

### 題目:

給定一個數字輸出這個數字的可能組合ex 3=1+2 3=2+1 3=1+1+1 return 3

### 連結:

<a>[https://leetcode.com/problems/climbing-stairs/](https://leetcode.com/problems/climbing-stairs/) </a>

### 範例:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.

1. 1 step + 1 step
2. 2 steps

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.

1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

### 解題思路:

其實就把側資輸出來看我們可以發現規律f(n)=f(n-1)+f(n-2)
迴圈:

```c++
class Solution {
public:
    int climbStairs(int n) {
        if(n==1)
            return 1;
        if(n==2)
            return 2;
        int f[n];
        f[0]=1;f[1]=2;
        for(int i=2;i<n;i++)
            f[i]=f[i-1]+f[i-2];
        return f[n-1];
    }
};
```

遞迴:
會超時不給過但還是放一下。

```c++
class Solution {
public:
    int climbStairs(int n) {
        return f(n);
    }
    int f(int n)
    {
        if(n==1)
            return 1;
        if(n==2)
            return 2;
        return f(n-1)+f(n-2);
    }
};
```

```c++
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n=cost.size()+1;
        vector<int> minCost(n);
        for(int i=2;i<n;i++)
        {
            minCost[i]=min((minCost[i-2]+cost[i-2]),(minCost[i-1]+cost[i-1]));
        }
        return minCost[n-1];
    }
};
```

# <span id="jump746">746. Min Cost Climbing</span>

### 題目:

待補

```c++
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n=cost.size();
        for (int i=2;i<n;i++) {
            cost[i]+=min(cost[i-1],cost[i-2]);
        }
        return min(cost[n-1],cost[n-2]);
    }
};
```

# <span id="jump438">438. Find All Anagrams in a String</span>

### 題目:

給定兩個字串s、p，若p的排列組合能在s的子字串出現返回第一個相同的位置

### 連結:

<a>[https://leetcode.com/problems/find-all-anagrams-in-a-string/](https://leetcode.com/problems/find-all-anagrams-in-a-string/) </a>

### 範例:

Input: s = “cbaebabacd”, p = “abc”
Output: [0,6]
Explanation:
The substring with start index = 0 is “cba”, which is an anagram of “abc”.
The substring with start index = 6 is “bac”, which is an anagram of “abc”.

Input: s = “abab”, p = “ab”
Output: [0,1,2]
Explanation:
The substring with start index = 0 is “ab”, which is an anagram of “ab”.
The substring with start index = 1 is “ba”, which is an anagram of “ab”.
The substring with start index = 2 is “ab”, which is an anagram of “ab”.

### 解題思路:

暴力解(超時):
直接用雙重for去檢查並用map來記錄每個字元的出現次數，若出現次數皆一樣則代表這個組合是可以的

```c++
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> res;
        map<char,int>cp;
        map<char,int>cs;
        bool test=true;
        if(s.size()<p.size())
            return res;
         for(int i=0;i<s.size();i++)
         {
             for(int j=0;j<p.size();j++)
             {
                 if(i+j>=s.size())
                     return res;
                 cp[p[j]]++;
                 cs[s[i+j]]++;
             }
             for(int j=0;j<p.size();j++)
             {
                 if(cp[p[j]]!=cs[p[j]])
                 {
                     
                     test=false;
                     break;
                 }
             }
            if(test)
                res.push_back(i);
             cp.clear();
             cs.clear();
             test=true;
         }
        return res;
    }
};
```

解法二:
使用sliding window，且判斷只改用26個字母，因為p.size()可能很大，想法是每次將上一個範圍的char出現次數減掉，並加上下一個範圍的char，想像成有一個窗口每次往右滑一個單位，s_counter只會紀錄在這個窗口範圍內得字元出現次數，*** for loop得判斷是ss-ps+1是因為當剩餘的s字元不足以形成p就不必在比了，且要小心i+ps可能超出範圍所以要額外寫判斷，vector的效率低於array建議用array***

```c++
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
    int s_count['z' - 'a' + 1] = {0};
    int p_count['z' - 'a' + 1] = {0};
    // vector<int> counts1(26,0);
    // vector<int> counts2(26,0);
    int ps = p.size();
    int ss = s.size();
    vector<int> res;
        if(ss==0||ps>ss)
            return res;
    // first init 
    for (int i = 0; i < ps;i++)
    {
        p_count[p[i] - 'a']++;
        s_counts[s[i] - 'a']++;
    }
    for (int i = 0; i < ss-ps+1;i++)
    {
        bool test = true;
        // o(26) -> o(1) 因為a<char<z 
        for (char c = 'a'; c < 'z';c++)
        {
            if(s_count[c-'a']!=s_count[c-'a'])
            {
                test = false;
                break;
            }
        }
        if(test)
            res.push_back(i);
        // sliding window
        if(ps+i<ss)
        {
            //減掉窗口最左邊
            s_count[s[i] - 'a']--;
            //將上窗口最右邊+1，因為第一個窗口以初始完成，因此窗口從i+ps開始
            s_count[s[i+ps] - 'a']++;
        }
    }
    return res;
    }
};
```

# <span id="jump424">424. Longest Repeating Character Replacement</span>

### 題目:

給定一個字串s與整數k，尋找由相同字元所組成的最長子字串，其中這個子字串可中的字元最多可被替換k次，舉例s=aaabvb k=2
則替換bv->a有5個a為相同字元所組成的最長子字串，return 5;

### 連結:

<a>[https://leetcode.com/problems/longest-repeating-character-replacement/](https://leetcode.com/problems/longest-repeating-character-replacement/) </a>

### 範例:

Input: s = “ABAB”, k = 2
Output: 4
Explanation: Replace the two ‘A’s with two ‘B’s or vice versa.

Input: s = “AABABBA”, k = 1
Output: 4
Explanation: Replace the one ‘A’ in the middle with ‘B’ and form “AABBBBA”.
The substring “BBBB” has the longest repeating letters, which is 4.

### 解題思路:

使用sliding window，滑動條件是當前最多字元的出現次數+k小於window size，代表此window即使替換k個字元也已經無法組成最長子字串了，因此要滑動至下個範圍(剃除最左邊字元出現次數，且左邊範圍要+1，右邊則每次加1就好)
*** 由於判斷條件是用maxCount所以最後的right-left一定是最大的子字串，雖然right++但在if裡left又–故不變 ***

```c++
class Solution {
public:
    int characterReplacement(string s, int k) {
        int size=s.size();
        if(size<2)
            return size;
        int maxCount=0;
        int left=0;
        int counter[26]={0};
        int right=0;
        while(right<size)
        {
            counter[s[right]-'A']++;
            maxCount=max(maxCount,counter[s[right]-'A']);
            ++right;
            if(right-left>maxCount+k) //如果超出範圍，縮小window size
                counter[s[left++]-'A']--;
        }
        
        return right-left; //因為right-left
    }
};
```

# <span id="jump1">1. Two Sum</span>

### 題目:

給定一個array跟traget，若array中的任意兩個元素相加能組成target則return 這兩個元素的index
此題可假設必定有一個解，且此解為唯一解。

### 連結:

<a>[https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/) </a>

### 範例:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Input: nums = [3,2,4], target = 6
Output: [1,2]

### 解題思路:

解法1:
直接暴力解，第一個範圍為0-size，每當第一個範圍往後移一位第二個範圍也要移一個，並且每次接跑到size，這樣就能確定所有可能，但複雜度為o(n*n)不太好。

```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> ans(2);
        for(int i=0;i<nums.size();i++)
        {
            for(int j=i+1;j<nums.size();j++)
            {
                if(nums[i]+nums[j]==target)
                {
                    ans[0]=i;
                    ans[1]=j;
                    return ans;
                }
            }
        }
        return ans;
    }
};
```

解法二:
使用hash table的概念，table的索引值存入array的value，table的value存入array的索引值，若target減掉當前的array value存在，代表可以用當前的array value的index和table的value(也就是之前的array index)組成target，反之將此數組存入table使得下次比對。
*** 如果給定的鍵存在於unordered_map中，則它向該元素返回一個迭代器，否則返回映射迭代器的末尾，且unordered_map的取值效率比map好很多，因為map是用紅黑樹做出來的，而unordered_map是真的hash table因此空間使用上比map高 ***

```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> valueToIndex;
        valueToIndex[nums[0]]=0;
        for(int i=1;i<nums.size();i++)
        {
            auto temp=valueToIndex.find(target-nums[i]);
            if(temp!=valueToIndex.end())
                return {i,temp->second};
            else
                valueToIndex[nums[i]]=i;
        }
        return {};
    }
};
```

# <span id="jump1046">1046. Last Stone Weight</span>

### 題目:

給定一個array每個index對應元素，每次要從這些元素選取最大和第二大的元素，若最大==第二大將這兩個元素都刪除，反之將最大減第二大的值取代array的最大元素，並把第二大的值刪除，更新後的array一樣要按照上述規則。

### 連結:

<a>[https://leetcode.com/problems/last-stone-weight/](https://leetcode.com/problems/last-stone-weight/) </a>

### 範例:

Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation:
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that’s the value of the last 

Input: stones = [1]
Output: 1

### 解題思路:

解法一(每次更新都排序):
每次更新皆sorting一次，sorting的完的結果取最後兩值，因為是由小到大。
Time Complexity: O(n * nlogn) 因為每次都要sorting一次，而sorting最快也要nlogn->n*nlogn
Space Complexity: O(1)

```c++
class Solution {
public:
     int lastStoneWeight(vector<int>& stones) {

        sort(stones.begin(), stones.end());
        while(stones.size() > 1){
            int a = stones.back();
            stones.pop_back();
            int b = stones.back();
            stones.pop_back();

            if(a != b){
                stones.push_back(a - b);
                sort(stones.begin(), stones.end());
            }
        }

        if(stones.size()) return stones[0];
        return 0;
    }
};
```

解法二(使用priority_queue):
用STL中的priority_queue，priority_queue預設會將array由大到小排列，並把最大的值放在top，可透過自行撰寫cmp函式定義優先權，因此只要每次對priority_queue的第一個位置和第二個位置做運算即可，*** 且priority_queue.push(x)會自己判斷x的優先權是多少並將其放入對應的位置，且若priority_queue完全沒元素要return 0 ***
Time Complexity: O(nlogn) 因為概念為max heap tree
Space Complexity: O(n)

```c++
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> pq;
        for(int e: stones) pq.push(e);
        while(pq.size()>1)
        {
            int first=pq.top();
            pq.pop();
            int second=pq.top();
            pq.pop();
            if(first-second!=0)
                pq.push(first-second);
            // cout<<pq.top();
        }
        return (pq.size()==0)? 0:pq.top();
    }
};
```
