#!/usr/bin/env python3
# Script to add Line 03 to services in i18n.ts

import re

# Read the i18n.ts file
with open(r'D:\Escritorio\HEYDEStudio_Web\lib\i18n.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the services section
services_match = re.search(r'services:\s*\{([^}]+)\},', content, re.DOTALL)
if services_match:
    # Find the end of Line 02 (look for the closing of the lines array)
    lines_end = content.find("lines: [")
    if lines_end != -1:
        # Find the closing bracket of the array
        bracket_count = 0
        start_pos = content.find("[", lines_end)
        i = start_pos + 1
        while i < len(content):
            if content[i] == "[":
                bracket_count += 1
            elif content[i] == "]":
                if bracket_count == 0:
                    # Found the closing bracket
                    insert_pos = i
                    # Insert Line 03 before the closing bracket
                    line03 = '''
          {
            number: "03",
            title: "Branded AI Infrastructure for Teams",
            description: "For in-house teams and agencies that need to scale visual production without hiring, outsourcing, or losing control.",
            includes: [
              "Custom AI workflow tailored to your brand and tools",
              "System documentation & locked identities",
              "Team training (3 hands-on sessions)",
              "3 months of optimization & check-ins",
              "Playbook & reusable templates"
            ],
            price: "€3,500 - €8,000",
            cta: "Schedule Free Audit"
          }'''
                    # Find the position of the last } in lines array
                    new_content = content[:insert_pos] + "," + line03 + "\n        " + content[insert_pos:]
                    
                    # Write back
                    with open(r'D:\Escritorio\HEYDEStudio_Web\lib\i18n.ts', 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print("✅ Line 03 added successfully")
                    break
                else:
                    bracket_count -= 1
            elif content[i] == "{":
                bracket_count += 1
            i += 1
else:
    print("❌ Services section not found")
