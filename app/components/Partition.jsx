"use client";
import { useState } from "react";

const RecursivePartition = () => {
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };
  const [partitions, setPartitions] = useState([
    {
      id: "initial-partition",
      color: "#7F00FF",
      direction: null,
      children: [],
    },
  ]);

  const splitPartition = (id, direction) => {
    const newPartitions = JSON.parse(JSON.stringify(partitions));

    const getPartition = (partitions, id) => {
      for (let partition of partitions) {
        if (partition.id === id) return partition;
        if (partition.children.length > 0) {
          const found = getPartition(partition.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const partition = getPartition(newPartitions, id);
    if (partition) {
      partition.direction = direction;
      partition.children = [
        {
          id: `${id}-1`,
          color: partition.color,
          direction: null,
          children: [],
        },
        {
          id: `${id}-2`,
          color: getRandomColor(),
          direction: null,
          children: [],
        },
      ];
    }

    setPartitions(newPartitions);
  };

  const removePartition = (id) => {
    const newPartitions = JSON.parse(JSON.stringify(partitions));

    const removePartitionRecursively = (partitions, id) => {
      return partitions.filter((partition) => {
        if (partition.id === id) return false;
        partition.children = removePartitionRecursively(partition.children, id);
        return true;
      });
    };

    setPartitions(removePartitionRecursively(newPartitions, id));
  };

  const renderPartition = (partition) => {
    return (
      <div
        key={partition.id}
        className={`relative flex flex-1 resizable ${
          partition.direction === "V" ? "flex-row" : "flex-col"
        }`}
        style={{
          backgroundColor: partition.color,
          minWidth: "50px",
          minHeight: "50px",
        }}
      >
        <div className="absolute top-1 right-1 flex justify-center gap-1">
          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => splitPartition(partition.id, "V")}
          >
            V
          </button>
          <button
            className="cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => splitPartition(partition.id, "H")}
          >
            H
          </button>
          <button
            className="cursor-pointer bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => removePartition(partition.id)}
          >
            -
          </button>
        </div>
        {partition.children.length > 0 &&
          partition.children.map((child) => renderPartition(child))}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="relative w-4/5 h-4/5 resize overflow-auto border-4 border-green-500 border- flex">
        {partitions.map((partition) => renderPartition(partition))}
      </div>
    </div>
  );
};

export default RecursivePartition;
