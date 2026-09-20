import { afterEach, describe, expect, it, vi } from "vitest";
import { debounce } from "../../src/function/debounce.js";

describe("debounce", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not execute immediately", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();

    expect(fn).not.toHaveBeenCalled();
  });

  it("executes after the delay", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();

    vi.advanceTimersByTime(99);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("resets the timer when called again", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();

    vi.advanceTimersByTime(50);

    debounced();

    vi.advanceTimersByTime(50);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("executes only once after multiple rapid calls", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(20);

    debounced();
    vi.advanceTimersByTime(20);

    debounced();
    vi.advanceTimersByTime(20);

    debounced();

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("uses the arguments from the latest call", () => {
    vi.useFakeTimers();

    const fn = vi.fn((value: string) => value);
    const debounced = debounce(fn, 100);

    debounced("first");

    vi.advanceTimersByTime(50);

    debounced("second");

    vi.advanceTimersByTime(50);

    debounced("third");

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("third");
  });

  it("passes multiple arguments correctly", () => {
    vi.useFakeTimers();

    const fn = vi.fn((a: number, b: number) => a + b);

    const debounced = debounce(fn, 100);

    debounced(10, 20);

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith(10, 20);
  });

  it("creates independent timers for independent debounced functions", () => {
    vi.useFakeTimers();

    const first = vi.fn();
    const second = vi.fn();

    const debouncedFirst = debounce(first, 100);
    const debouncedSecond = debounce(second, 200);

    debouncedFirst();
    debouncedSecond();

    vi.advanceTimersByTime(100);

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(second).toHaveBeenCalledTimes(1);
  });

  it("can execute again after the previous call has completed", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);

    debounced();

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("works with a zero delay", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const debounced = debounce(fn, 0);

    debounced();

    expect(fn).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
