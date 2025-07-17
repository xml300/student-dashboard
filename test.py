import os
import argparse
import fnmatch

def export_files(directory, output_file, exclude_paths=None, exclude_patterns=None):
    """
    Exports files from a directory to a single file, with options to exclude
    specific paths and file patterns.

    Args:
        directory (str): The path to the directory to scan.
        output_file (str): The path to the output file.
        exclude_paths (list, optional): A list of paths to exclude. Defaults to None.
        exclude_patterns (list, optional): A list of file patterns to exclude (e.g., '*.log', 'temp_*').
                                            Defaults to None.
    """
    if exclude_paths is None:
        exclude_paths = []
    if exclude_patterns is None:
        exclude_patterns = []

    # Normalize paths for reliable comparison
    exclude_paths = [os.path.abspath(p) for p in exclude_paths]
  
    with open(output_file, 'w', encoding='utf-8') as out_f:
        for root, _, files in os.walk(directory):
            # Check if the current directory should be excluded
            if any(map(lambda x: os.path.abspath(root).startswith(x), exclude_paths)):
                continue

            for file in files:
                file_path = os.path.join(root, file)
                file_abs_path = os.path.abspath(file_path)
                print(file_abs_path)
                

                # Check if the file path or pattern should be excluded
                if file_abs_path in exclude_paths:
                    continue
                if any(fnmatch.fnmatch(file, pattern) for pattern in exclude_patterns):
                    continue

                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as in_f:
                        content = in_f.read()
                    out_f.write(f"--- File: {file_abs_path} ---\n")
                    out_f.write(content)
                    out_f.write("\n\n")
                except Exception as e:
                    print(f"Error reading file {file_path}: {e}")

def main():
    """Main function to parse arguments and run the export process."""
    parser = argparse.ArgumentParser(
        description="Export files from a directory to a single file."
    )
    parser.add_argument(
        "directory",
        help="The directory to scan."
    )
    parser.add_argument(
        "output_file",
        help="The file to write the output to."
    )
    parser.add_argument(
        "--exclude-paths",
        help="A comma-separated list of directory or file paths to exclude."
    )
    parser.add_argument(
        "--exclude-patterns",
        help="A comma-separated list of file patterns to exclude (e.g., '*.log', 'temp_*')."
    )

    args = parser.parse_args()

    exclude_paths_list = args.exclude_paths.split(',') if args.exclude_paths else []
    exclude_patterns_list = args.exclude_patterns.split(',') if args.exclude_patterns else []

    print(exclude_paths_list, exclude_patterns_list)

    export_files(
        args.directory,
        args.output_file,
        exclude_paths_list,
        exclude_patterns_list
    )
    print(f"Export complete. All files have been written to {args.output_file}")

if __name__ == "__main__":
    main()
