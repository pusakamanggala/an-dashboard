export const getToken = () => {
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth-token="));

  if (tokenCookie) {
    return tokenCookie.split("=")[1];
  } else {
    // Handle the case when the token cookie is not present.
    return null; // You can return null or any other suitable value.
  }
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const year = String(date.getFullYear());
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export const getBadgeColor = (status) => {
  switch (status) {
    case "Normal":
      return "bg-green-100 text-green-600";
    case "Warning":
      return "bg-red-100 text-red-600";
  }
};

export const paginate = (data, itemsPerPage, currentPage) => {
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to get the current page's items
  const paginatedData = data.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return {
    currentPage,
    totalPages,
    totalItems: data.length,
    itemsPerPage,
    data: paginatedData,
  };
};
