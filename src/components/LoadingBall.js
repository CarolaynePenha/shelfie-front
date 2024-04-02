import { BallTriangle } from "react-loader-spinner";
export default function Loading() {
  return (
    <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#574145"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}
