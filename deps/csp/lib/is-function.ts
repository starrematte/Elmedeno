export default function isFunction (value?: unknown): value is Function {
  return value instanceof Function;
}
