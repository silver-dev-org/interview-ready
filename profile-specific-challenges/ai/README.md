# Prompt Executor Challenge

At **XXX**, we are building a system to handle user queries.

This system will leverage **Generative AI**. To do so, it will generate “prompts” — requests to LLMs — based on user inputs, documentation, API results, etc.

A **prompt** is, therefore, a text string that will be sent to an LLM. For the LLM backend, we are considering using **ChatGPT**, **Gemini**, or **Claude**.

```python
class Executor:
    ...
    def run(prompt, metadata):
        ...
        return response
```

Example
```python
    prompt = "Write a python call that recursively solves fibonacci"
    metadata = { price: 0.1, quality: 1 }
    executor.run(prompt, metadata)
    # { model: claude-sonnet, response: '...'}
```

The system must handle abstraction over the backend call, selecting the most suitable model based on the `prompt` and the provided `metadata`.

You are free to define what metadata includes. Consider the following:

- 💸 **Cost** of resolving the prompt
- ⏱️ **Estimated response time**
- 🔐 **Security**: Is it safe to execute and return this prompt to the user?
- 📊 **Analytics**: It may be useful to track execution statistics, such as:
  - What percentage of prompts are routed to each model
  - Cost per model and total system cost
  - Logs for future analysis

---

## ✅ Expected Deliverables

1. The implementation of the `PromptExecutor`
2. Run prompts from the HotPotQA test dataset:
   http://curtis.ml.cmu.edu/datasets/hotpot/hotpot_test_fullwiki_v1.json
3. Calculate:
   - Total and per-word **cost**
   - Total and per-word **response time**
   - Number of requests routed to each model
   - The **log** produced for future analytics (format is up to you)

---

## Evaluation Criteria

The challenge is purposely ambiguous. We want to see you experiment and communicate your ideas and implementation.
We will evaluate your deliverable based on the following criteria.

1. Technical Excellence
2. Communication and decision making
3. Product Sense

## Tips & Tricks

1. Feel free to make questions or suggestions about about the challenge to your technical interviewers.
2. Check out the [Takehome Guide](https://docs.silver.dev/interview-ready/technical-fundamentals/code-quality/guia-de-takehomes) from Silver.dev for an extended guide.
