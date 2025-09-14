---
title: "Sample Lesson: ML Basics"
description: "Understanding the fundamentals of machine learning"
weight: 1
lastmod: 2024-09-14T09:00:00-07:00
draft: false
vimeo: 123456789
emoji: 📊
free: true
---

# Machine Learning Basics

This is a sample lesson template. Replace this content with your actual lesson material.

## Learning Objectives

By the end of this lesson, you will:

- Understand what machine learning is
- Know the different types of ML algorithms
- Be able to identify ML use cases
- Have hands-on experience with a simple model

## Video Content

The video player will display here based on the vimeo ID in the frontmatter.

## Code Example

```python
# Sample Python code for ML
import numpy as np
from sklearn.linear_model import LinearRegression

# Sample data
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make prediction
prediction = model.predict([[5]])
print(f"Prediction for input 5: {prediction[0]}")
```

## Exercise

Try modifying the code above to:
1. Add more data points
2. Test different input values
3. Calculate the model's accuracy

## Summary

This lesson template demonstrates how to structure educational content with:
- Clear learning objectives
- Video integration
- Code examples
- Hands-on exercises

Replace this content with your actual AI/ML lesson material.