import { afterEach, describe, expect, it, vi } from "vitest";
import { throttle } from "../../src/function/throttle.js";

describe("throttle", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("executes immediately on the first call", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("ignores calls during the delay", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();

    vi.advanceTimersByTime(50);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("executes again after the delay", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();

    vi.advanceTimersByTime(100);

    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("does not execute again before the delay expires", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();

    vi.advanceTimersByTime(99);

    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("executes exactly at the delay boundary", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();

    vi.advanceTimersByTime(100);

    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("uses the arguments from the call that gets executed", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled("first");

    expect(fn).toHaveBeenCalledWith("first");

    vi.advanceTimersByTime(50);

    throttled("second");

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("first");

    vi.advanceTimersByTime(50);

    throttled("third");

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("third");
  });

  it("passes multiple arguments correctly", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled(10, "hello", true);

    expect(fn).toHaveBeenCalledWith(10, "hello", true);
  });

  it("allows repeated execution over time", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();

    vi.advanceTimersByTime(100);
    throttled();

    vi.advanceTimersByTime(100);
    throttled();

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("creates independent throttled functions", () => {
    vi.useFakeTimers();

    const first = vi.fn();
    const second = vi.fn();

    const throttledFirst = throttle(first, 100);
    const throttledSecond = throttle(second, 200);

    throttledFirst();
    throttledSecond();

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);

    throttledFirst();
    throttledSecond();

    expect(first).toHaveBeenCalledTimes(2);
    expect(second).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);

    throttledSecond();

    expect(second).toHaveBeenCalledTimes(2);
  });

  it("works with a zero delay", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const throttled = throttle(fn, 0);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(3);
  });
});
