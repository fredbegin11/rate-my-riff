const LoadingIcon = () => {
  return (
    <div className="flex items-center">
      <div
        style={{ borderTopColor: 'transparent' }}
        className="w-4 h-4 border-2 border-indigo-400 border-solid rounded-full animate-spin"
        role="status"
      />
    </div>
  );
};

export default LoadingIcon;
