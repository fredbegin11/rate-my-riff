interface Action {
  onClick: (id: string) => void;
  icon?: React.ReactNode;
  render?: (showBadge: boolean) => React.ReactNode;
}

export default Action;
