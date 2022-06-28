---
title: LeetCode
date: 2022-06-28 18:32:56
header-img: "test.jpg"
subtitle : '紀錄解題過程以及提供source code'
tags:
    - LeetCode
---
> 目錄大綱
* 53.Maximum Subarray
* 35.Search Insert Position
* 27.Remove Element

# 53.Maximum Subarray

### 題目:
今天有一個array，我們要找出在這個array中連續和最大的結果。
### 範例:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

### 解題思路:

### source code:
```c++
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int max=nums[0];
        for(int i=1;i<nums.size();i++)
        {
            if(nums[i-1]>=0)
                nums[i]+=nums[i-1];
            if(max<nums[i])
                max=nums[i];
        }
        return max;
    }
};
```