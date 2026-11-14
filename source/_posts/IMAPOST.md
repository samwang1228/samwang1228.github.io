---
title: LeetCode(Easy)
date: 2022-06-28 18:32:56
subtitle: '紀錄解題過程以及提供source code'
tags:
    - LeetCode
---

> 根據不同的題目類型進行分類，歡迎一起討論留言告訴我你的思路:)
>
>
> * Linked list
>   * [83.Remove Duplicates from Sorted List](#jump83)
> * Greedy
>   * [53.Maximum Subarray](#jump53)
>   * yyyy
> * Algorithm
>   * [35.Search Insert Position](#jump35)
> * Basic Logic
>   * [27.Remove Element](#jump27)

# <span id="jump83">83.Remove Duplicates from Sorted List</span>

### 題目:

今天有一個排序後的list，若有重複的值則將其拿掉。

### 連結:

<a>[https://leetcode.com/problems/remove-duplicates-from-sorted-list/](https://leetcode.com/problems/remove-duplicates-from-sorted-list/) </a>

### 範例:

Input  1->1->2->3->3
Output 1->2->3 //remove 1,3 

### 解題思路:

當前值等於下一個值就將指標直接指向下下個，以捨棄下一個，反之就繼續正常尋訪。

<font color=#FF0000>注意cur->next不釋放會造成記憶體浪費</font>

### source code:

```c++
class Solution
{
public:
    ListNode* deleteDuplicates(ListNode* head) {
        if(!head)
            return head;
        ListNode *cur=head;
        while(cur->next)
        {
            if(cur->val==cur->next->val)
            {
                ListNode * temp=cur->next; //釋放cur->next
                cur->next=cur->next->next;
                delete (temp);
            }
            else
                cur=cur->next;
        }
        return head;
    }
};
```

# <span id="jump53">53.Maximum Subarray</span>

### 題目:

今天有一個array，我們要找出在這個array中連續和最大的結果。

### 連結:

<a>[https://leetcode.com/problems/maximum-subarray/](https://leetcode.com/problems/maximum-subarray/) </a>

### 範例:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

### 解題思路:

想成是累加問題(greedy)，若加上下一個值等於負的則重新累加，反之就繼續往下加，因為今天如果是負的就可以確定當前的subarray趨勢向下沒有必要繼續，**記得要每次都把當前累加後的最大值記錄下來要不然就沒意義了XDD**。

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

# <span id="jump35">35.Search Insert Position</span>

### 題目:

Given a sorted array of distinct integers and a target value, return the index  if the target is found. If not, return the index where it would be if it were inserted in order.
**You must write an algorithm with O(log n) runtime complexity.**

### 連結:

<a>[https://leetcode.com/problems/search-insert-position/](https://leetcode.com/problems/search-insert-position/) </a>

### 範例:

Input: nums = [1,3,5,6], target = 5
Output: 2
Input: nums = [1,3,5,6], target = 7
Output: 4 

### 解題思路:

//待補

### source code:

```c++
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size()-1;
        while (left<=right) {
          int mid = left+(right-left)/2;
          if (nums[mid]>target) {
            right=mid-1;
          } else if (nums[mid]<target) {
            left=mid+1;
          } else {
            return mid;
          }
        }
            return left;
    }
};
```

# <span id="jump27">27.Remove Element</span>

### 題目:

Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).

### 連結:

<a>[https://leetcode.com/problems/remove-element/](https://leetcode.com/problems/remove-element/)  </a>

### 範例:

Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_] Hint output (origin-val) of size and 把!=val 的值搬到vector前面

### 解題思路:

//待補

### source code:

```c++
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int counter=0;
        for(int i=0;i<nums.size();i++)
            if(nums[i]!=val)
                nums[counter++]=nums[i];
        return counter;
    }
};
```
