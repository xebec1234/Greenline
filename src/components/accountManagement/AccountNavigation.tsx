interface AccountNavigationProps {
  path: string[];
  onNavigate: (index: number) => void;
}

const AccountNavigation: React.FC<AccountNavigationProps> = ({
  path,
  onNavigate,
}) => {
  return (
    <div className="text-sm text-gray-500 mb-4">
      {path.map((item, index) => (
        <span key={index}>
          <button className="hover:underline" onClick={() => onNavigate(index)}>
            {item}
          </button>
          {index < path.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
};

export default AccountNavigation;
