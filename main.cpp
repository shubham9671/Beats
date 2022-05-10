#include<iostream>
using namespace std;

//function to reverse a string
int getMindeletion(string str)
{
    int n = str.length();
    int count = 0;
    int i, j;
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n; j++)
        {
            if (str[i] == str[j])
            {
                count++;
            }
        }
    }
    return n - count;
}
